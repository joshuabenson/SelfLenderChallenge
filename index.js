//adapted from http://bl.ocks.org/mbostock/5944371
var margin = {top: 450, right: 480, bottom: 350, left: 480},
    radius = Math.min(margin.top, margin.right, margin.bottom, margin.left),
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    padding = 5,
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
    textEnter, text;

var hue = d3.scale.category10();

var luminance = d3.scale.sqrt()
  .domain([0, 1e6])
  .clamp(true)
  .range([90, 20]);

var svg = d3.select("body").append("svg")
  .attr("width", margin.left + margin.right)
  .attr("height", margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var partition = d3.layout.partition()
  .sort(function(a, b) { return d3.ascending(a.name, b.name); })
  .size([2 * Math.PI, radius]);

var arc = d3.svg.arc()
  .startAngle(function(d) { return d.x; })
  .endAngle(function(d) { return d.x + d.dx - .01 / (d.depth + .5); })
  .innerRadius(function(d) { return radius / 3 * d.depth; })
  .outerRadius(function(d) { return radius / 3 * (d.depth + 1) - 1; });
function init(root) {
  // Compute the initial layout on the entire tree to sum sizes.
  // Also compute the full name and fill color for each node,
  // and stash the children so they can be restored as we descend.
  partition
    //return at least a size of 10, so slice can still be visible
    .value(function(d) { return d.size >= 10 ? d.size : 10; })
    .nodes(root)
    .forEach(function(d) {
      d._children = d.children;
      d.sum = d.value;
      d.key = key(d);
      d.fill = fill(d);
    });

  // Now redefine the value function to use the previously-computed sum.
  partition
    .children(function(d, depth) { return depth < 2 ? d._children : null; })
    .value(function(d) { return d.sum; });

  var center = svg.append("circle")
    .attr("r", radius / 3)
    .on("click", zoomOut);

  var path = svg.selectAll("path")
    .data(partition.nodes(root).slice(1))
    .enter().append("path")
    .attr("d", arc)
    .style("fill", function(d) { return d.fill; })
    .each(function(d) {this._current = updateArc(d); })
    .on("click", zoomIn)
    .html(function(d) { return d.name; })
    .style("text-align", "center")

  function addLabels(subRoot) {
    text = svg.selectAll("text").data(partition.nodes(subRoot).slice(1));
    textEnter = text.enter().append("text")
      .attr("x",0)          
      .text( function (d) { return d.name + '   -   ' + d.size })
      .attr("font-family", "sans-serif")
      .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
      .transition()
      .attr("x", function(d) { return (60 + d.y); })
      .attr("dx", "6") // margin
      .attr("dy", ".35em") // vertical-align
      .attr("font-family", "sans-serif")
  } 
  function computeTextRotation(d) {
    return ((d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
  }

  function zoomIn(p) {
    if (p.depth > 1) p = p.parent;
    if (!p.children) return;
    zoom(p, p);
  }

  function zoomOut(p) {
    if (!p.parent) return;
    zoom(p.parent, p);
    //remove the current label set
    text.remove();
  }

  // Zoom to the specified new root.
  function zoom(root, p) {
    if (document.documentElement.__transition__) return;

    // Rescale outside angles to match the new layout.
    var enterArc,
        exitArc,
        outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

    function insideArc(d) {
      return p.key > d.key
          ? {depth: d.depth - 1, x: 0, dx: 0} : p.key < d.key
          ? {depth: d.depth - 1, x: 2 * Math.PI, dx: 0}
          : {depth: 0, x: 0, dx: 2 * Math.PI};
    }

    function outsideArc(d) {
      return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
    }

    center.datum(root);
    //add labels to continent group
    addLabels(p);

    // When zooming in, arcs enter from the outside and exit to the inside.
    // Entering outside arcs start from the old layout.
    if (root === p) enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);

    path = path.data(partition.nodes(root).slice(1), function(d) { return d.key; });

    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.
    if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

    d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {
      path.exit().transition()
        .style("fill-opacity", function(d) { return d.depth === 1 + (root === p) ? 1 : 0; })
        .attrTween("d", function(d) { return arcTween.call(this, exitArc(d)); })
        .remove();

      path.enter().append("path")
        .style("fill-opacity", function(d) { return d.depth === 2 - (root === p) ? 1 : 0; })
        .style("fill", function(d) { return d.fill; })
        .on("click", zoomIn)
        .each(function(d) { this._current = enterArc(d); });

      path.transition()
        .style("fill-opacity", 1)
        .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
    });
  }
}

$(contTree).on('populated', function(){
  init(contTree);
});

function key(d) {
  var k = [], p = d;
  while (p.depth) k.push(p.name), p = p.parent;
  return k.reverse().join(".");
}

function fill(d) {
  var p = d;
  while (p.depth > 1) p = p.parent;
  var c = d3.lab(hue(p.name));
  c.l = luminance(d.sum);
  return c;
}

function arcTween(b) {
  var i = d3.interpolate(this._current, b);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

function updateArc(d) {
  // console.log(d);
  return {depth: d.depth, x: d.x, dx: d.dx};
}

d3.select(self.frameElement).style("height", margin.top + margin.bottom + "px");


//http://d3pie.org/#docs-dependencies
var myPie;
var openSegment;
var slices = [];
//d3pie takes two arguments:  #1=> target html element #2=> configuration object
$(countryNodes).on('populated', function(){
  var counter = 0;   
  for (var k in countryNodes) {
//check to see that node is not empty, then push it 
    if (countryNodes[k].length) {
      console.log(countryNodes[k].length);
      slices.push({
        label: k, 
        value: countryNodes[k].length
      });
    }
  }
  slices = slices.slice(130, slices.length);
  var configObj = {
    size: {
      canvasHeight: 800,
      canvasWidth: 800,
      pieInnerRadius: 100,
      pieOuterRadius: null
    },
    data: {
      sortOrder: "none",
      smallSegmentGrouping: {
        enabled: false,
        value: 1,
        valueType: "percentage",
        label: "Other",
        color: "#cccccc"
      },
  //content is of this form: [{ label: "label", value: 1.5, color: "#000000" }]
      content: slices
    },
    // tooltips: {
    //   enabled: true,
    //   type: "caption"
    // }
  };
  myPie = new d3pie("chart", configObj);
  openSegment = myPie.getOpenSegment();
  myPie.redraw();
});
//\\\\//********\\////\\
//\\\\//********\\////\\
    //\\\\//********\\////\\
        //\\\\//********\\////\\
            //\\\\//********\\////\\
            //\\\\//********\\////\\
            //\\\\//********\\////\\
        //\\\\//********\\////\\
    //\\\\//********\\////\\
  //\\\\//********\\////\\
//\\\\//********\\////\\
//\\\\//********\\////\\
//\\\\//********\\////\\
  //\\\\//********\\////\\
      //\\\\//********\\////\\
         //\\\\//********\\////\\
         //\\\\//********\\////\\
         //\\\\//********\\////\\
        //\\\\//********\\////\\
    //\\\\//********\\////\\
  //\\\\//********\\////\\
//\\\\//********\\////\\
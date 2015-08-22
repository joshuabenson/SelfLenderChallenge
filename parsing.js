// Load the xml file using ajax 
$.ajax({
    type: "GET",
    url: "sdn.xml",
    dataType: "xml",
    success: function (xml) {
        // console.log(xml);
        // Parse the xml file and get data
        var xmlDoc = xml2json(xml);
        var stringifiedDoc = JSON.stringify(xmlDoc);
        var parsedDoc = JSON.parse(stringifiedDoc);
        // console.log(parsedDoc);
            // $xml = $(xmlDoc);
            // $("body").append($xml);
    }
});

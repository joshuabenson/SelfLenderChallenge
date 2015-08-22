// Load the xml file
var myXml = new XMLHttpRequest();
var myXmlData;

myXml.open("GET","sdn.xml",false);
myXml.onloadend = function(d) {
  myXmlData = myXml.responseXML;  
  console.log('load end');
}
myXml.send();

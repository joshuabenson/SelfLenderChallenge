// Load the xml file
var myXml = new XMLHttpRequest();
var myXmlData;
var countryNodes = {};
var countryCont = [];
var trigFlag = false;
var searches = ['country', 'program', 'address', 'idCountry', 'placeOfBirth'];
var searchResults = [];
var contTree = {
  "name":"D3",
  "children": [
    {
      "name": "AF",
      "children": []
    },
    {
      "name": "AN",
      "children": []
    },
    {
      "name": "AS",
      "children": []
    },
    {
      "name": "EU",
      "children": []
    },
    {
      "name": "NA",
      "children": []
    },
    {
      "name": "OC",
      "children": []
    },
    {
      "name": "SA",
      "children": []
    }
  ]       
};

function popNodes() {
  $.ajax({
      type: "GET",
      url: 'sdn.xml',
      dataType: "xml",
      success:findRoots
  });
}
//Finds the root node of each match 
function findRoot(node, result) {
  if ($(node).is('sdnentry')) {
    return node;
  }
  if (node.parentNode) return findRoot(node.parentNode);
}
//Find entrys matching the country name
  //Find the parent node
  //Check to see if that node is already in the list for that country
  //if it is not, add it to the list

function findCountryTag(sdnNode, tag, depth) {
  var target;
  depth = depth || 0
  if ($(sdnNode).is(tag)) return sdnNode;
  for (var i = 0; i < sdnNode.children.length; i++) {
    if ($(sdnNode.children[i]).is(tag)) {
       return target = sdnNode.children[i];
    } else {
      target = findCountryTag(sdnNode.children[i], tag, depth + 1);
      if (target) return target;
    }
  }
  return target;
}

function findRoots(xml) {
  var allSdnEntries = $(xml).find('sdnEntry'); //get a collection of sdnEntry nodes
  for (var key in allSdnEntries) {
    if (allSdnEntries[key].innerHTML) {
      var toAdd = findCountryTag(allSdnEntries[key], 'programList')
      toAdd ? searchResults.push(toAdd) : 0
    }
  }
  // countryCont.forEach(function(cNode) {
  //   var countryTag = $(xml).find('country:contains(' + cNode['name'] + ')'); //get a collection of matching nodes

  //   for (var key in countryTag) {
  //     if (countryTag[key].innerHTML) {
  //       searchResults.push(findRoot(countryTag[key]));
  //     }
  //   }
  // });
      console.log(searchResults);
  contTree.children.forEach(function(coNode) {
      coNode['children'].push(
        {
          // "name": cNode['name'],
          // "size": newTemp.length
        }
      );

  });

    // console.log(contTree);
    // countryNodes[cNode['name']] =  $(xml).find('country:contains(' + cNode['name'] + ')');
  $(contTree).trigger('populated');
}
var countries = [
  {"name": "Afghanistan", "code": "AF"}, 
  {"name": "Åland Islands", "code": "AX"}, 
  {"name": "Albania", "code": "AL"}, 
  {"name": "Algeria", "code": "DZ"}, 
  {"name": "American Samoa", "code": "AS"}, 
  {"name": "AndorrA", "code": "AD"}, 
  {"name": "Angola", "code": "AO"}, 
  {"name": "Anguilla", "code": "AI"}, 
  {"name": "Antarctica", "code": "AQ"}, 
  {"name": "Antigua and Barbuda", "code": "AG"}, 
  {"name": "Argentina", "code": "AR"}, 
  {"name": "Armenia", "code": "AM"}, 
  {"name": "Aruba", "code": "AW"}, 
  {"name": "Australia", "code": "AU"}, 
  {"name": "Austria", "code": "AT"}, 
  {"name": "Azerbaijan", "code": "AZ"}, 
  {"name": "Bahamas", "code": "BS"}, 
  {"name": "Bahrain", "code": "BH"}, 
  {"name": "Bangladesh", "code": "BD"}, 
  {"name": "Barbados", "code": "BB"}, 
  {"name": "Belarus", "code": "BY"}, 
  {"name": "Belgium", "code": "BE"}, 
  {"name": "Belize", "code": "BZ"}, 
  {"name": "Benin", "code": "BJ"}, 
  {"name": "Bermuda", "code": "BM"}, 
  {"name": "Bhutan", "code": "BT"}, 
  {"name": "Bolivia", "code": "BO"}, 
  {"name": "Bosnia and Herzegovina", "code": "BA"}, 
  {"name": "Botswana", "code": "BW"}, 
  {"name": "Bouvet Island", "code": "BV"}, 
  {"name": "Brazil", "code": "BR"}, 
  {"name": "British Indian Ocean Territory", "code": "IO"}, 
  {"name": "Brunei Darussalam", "code": "BN"}, 
  {"name": "Bulgaria", "code": "BG"}, 
  {"name": "Burkina Faso", "code": "BF"}, 
  {"name": "Burundi", "code": "BI"}, 
  {"name": "Cambodia", "code": "KH"}, 
  {"name": "Cameroon", "code": "CM"}, 
  {"name": "Canada", "code": "CA"}, 
  {"name": "Cape Verde", "code": "CV"}, 
  {"name": "Cayman Islands", "code": "KY"}, 
  {"name": "Central African Republic", "code": "CF"}, 
  {"name": "Chad", "code": "TD"}, 
  {"name": "Chile", "code": "CL"}, 
  {"name": "China", "code": "CN"}, 
  {"name": "Christmas Island", "code": "CX"}, 
  {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
  {"name": "Colombia", "code": "CO"}, 
  {"name": "Comoros", "code": "KM"}, 
  {"name": "Congo", "code": "CG"}, 
  {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
  {"name": "Cook Islands", "code": "CK"}, 
  {"name": "Costa Rica", "code": "CR"}, 
  {"name": "Cote D\"Ivoire", "code": "CI"}, 
  {"name": "Croatia", "code": "HR"}, 
  {"name": "Cuba", "code": "CU"}, 
  {"name": "Cyprus", "code": "CY"}, 
  {"name": "Czech Republic", "code": "CZ"}, 
  {"name": "Denmark", "code": "DK"}, 
  {"name": "Djibouti", "code": "DJ"}, 
  {"name": "Dominica", "code": "DM"}, 
  {"name": "Dominican Republic", "code": "DO"}, 
  {"name": "Ecuador", "code": "EC"}, 
  {"name": "Egypt", "code": "EG"}, 
  {"name": "El Salvador", "code": "SV"}, 
  {"name": "Equatorial Guinea", "code": "GQ"}, 
  {"name": "Eritrea", "code": "ER"}, 
  {"name": "Estonia", "code": "EE"}, 
  {"name": "Ethiopia", "code": "ET"}, 
  {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
  {"name": "Faroe Islands", "code": "FO"}, 
  {"name": "Fiji", "code": "FJ"}, 
  {"name": "Finland", "code": "FI"}, 
  {"name": "France", "code": "FR"}, 
  {"name": "French Guiana", "code": "GF"}, 
  {"name": "French Polynesia", "code": "PF"}, 
  {"name": "French Southern Territories", "code": "TF"}, 
  {"name": "Gabon", "code": "GA"}, 
  {"name": "Gambia", "code": "GM"}, 
  {"name": "Georgia", "code": "GE"}, 
  {"name": "Germany", "code": "DE"}, 
  {"name": "Ghana", "code": "GH"}, 
  {"name": "Gibraltar", "code": "GI"}, 
  {"name": "Greece", "code": "GR"}, 
  {"name": "Greenland", "code": "GL"}, 
  {"name": "Grenada", "code": "GD"}, 
  {"name": "Guadeloupe", "code": "GP"}, 
  {"name": "Guam", "code": "GU"}, 
  {"name": "Guatemala", "code": "GT"}, 
  {"name": "Guernsey", "code": "GG"}, 
  {"name": "Guinea", "code": "GN"}, 
  {"name": "Guinea-Bissau", "code": "GW"}, 
  {"name": "Guyana", "code": "GY"}, 
  {"name": "Haiti", "code": "HT"}, 
  {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
  {"name": "Holy See (Vatican City State)", "code": "VA"}, 
  {"name": "Honduras", "code": "HN"}, 
  {"name": "Hong Kong", "code": "HK"}, 
  {"name": "Hungary", "code": "HU"}, 
  {"name": "Iceland", "code": "IS"}, 
  {"name": "India", "code": "IN"}, 
  {"name": "Indonesia", "code": "ID"}, 
  {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
  {"name": "Iraq", "code": "IQ"}, 
  {"name": "Ireland", "code": "IE"}, 
  {"name": "Isle of Man", "code": "IM"}, 
  {"name": "Israel", "code": "IL"}, 
  {"name": "Italy", "code": "IT"}, 
  {"name": "Jamaica", "code": "JM"}, 
  {"name": "Japan", "code": "JP"}, 
  {"name": "Jersey", "code": "JE"}, 
  {"name": "Jordan", "code": "JO"}, 
  {"name": "Kazakhstan", "code": "KZ"}, 
  {"name": "Kenya", "code": "KE"}, 
  {"name": "Kiribati", "code": "KI"}, 
  {"name": "Korea, Democratic People\"S Republic of", "code": "KP"}, 
  {"name": "Korea, Republic of", "code": "KR"}, 
  {"name": "Kuwait", "code": "KW"}, 
  {"name": "Kyrgyzstan", "code": "KG"}, 
  {"name": "Lao People\"S Democratic Republic", "code": "LA"}, 
  {"name": "Latvia", "code": "LV"}, 
  {"name": "Lebanon", "code": "LB"}, 
  {"name": "Lesotho", "code": "LS"}, 
  {"name": "Liberia", "code": "LR"}, 
  {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
  {"name": "Liechtenstein", "code": "LI"}, 
  {"name": "Lithuania", "code": "LT"}, 
  {"name": "Luxembourg", "code": "LU"}, 
  {"name": "Macao", "code": "MO"}, 
  {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
  {"name": "Madagascar", "code": "MG"}, 
  {"name": "Malawi", "code": "MW"}, 
  {"name": "Malaysia", "code": "MY"}, 
  {"name": "Maldives", "code": "MV"}, 
  {"name": "Mali", "code": "ML"}, 
  {"name": "Malta", "code": "MT"}, 
  {"name": "Marshall Islands", "code": "MH"}, 
  {"name": "Martinique", "code": "MQ"}, 
  {"name": "Mauritania", "code": "MR"}, 
  {"name": "Mauritius", "code": "MU"}, 
  {"name": "Mayotte", "code": "YT"}, 
  {"name": "Mexico", "code": "MX"}, 
  {"name": "Micronesia, Federated States of", "code": "FM"}, 
  {"name": "Moldova, Republic of", "code": "MD"}, 
  {"name": "Monaco", "code": "MC"}, 
  {"name": "Mongolia", "code": "MN"}, 
  {"name": "Montserrat", "code": "MS"}, 
  {"name": "Morocco", "code": "MA"}, 
  {"name": "Mozambique", "code": "MZ"}, 
  {"name": "Myanmar", "code": "MM"}, 
  {"name": "Namibia", "code": "NA"}, 
  {"name": "Nauru", "code": "NR"}, 
  {"name": "Nepal", "code": "NP"}, 
  {"name": "Netherlands", "code": "NL"}, 
  {"name": "Netherlands Antilles", "code": "AN"}, 
  {"name": "New Caledonia", "code": "NC"}, 
  {"name": "New Zealand", "code": "NZ"}, 
  {"name": "Nicaragua", "code": "NI"}, 
  {"name": "Niger", "code": "NE"}, 
  {"name": "Nigeria", "code": "NG"}, 
  {"name": "Niue", "code": "NU"}, 
  {"name": "Norfolk Island", "code": "NF"}, 
  {"name": "Northern Mariana Islands", "code": "MP"}, 
  {"name": "Norway", "code": "NO"}, 
  {"name": "Oman", "code": "OM"}, 
  {"name": "Pakistan", "code": "PK"}, 
  {"name": "Palau", "code": "PW"}, 
  {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
  {"name": "Panama", "code": "PA"}, 
  {"name": "Papua New Guinea", "code": "PG"}, 
  {"name": "Paraguay", "code": "PY"}, 
  {"name": "Peru", "code": "PE"}, 
  {"name": "Philippines", "code": "PH"}, 
  {"name": "Pitcairn", "code": "PN"}, 
  {"name": "Poland", "code": "PL"}, 
  {"name": "Portugal", "code": "PT"}, 
  {"name": "Puerto Rico", "code": "PR"}, 
  {"name": "Qatar", "code": "QA"}, 
  {"name": "Reunion", "code": "RE"}, 
  {"name": "Romania", "code": "RO"}, 
  {"name": "Russian Federation", "code": "RU"}, 
  {"name": "RWANDA", "code": "RW"}, 
  {"name": "Saint Helena", "code": "SH"}, 
  {"name": "Saint Kitts and Nevis", "code": "KN"}, 
  {"name": "Saint Lucia", "code": "LC"}, 
  {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
  {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
  {"name": "Samoa", "code": "WS"}, 
  {"name": "San Marino", "code": "SM"}, 
  {"name": "Sao Tome and Principe", "code": "ST"}, 
  {"name": "Saudi Arabia", "code": "SA"}, 
  {"name": "Senegal", "code": "SN"}, 
  {"name": "Serbia and Montenegro", "code": "CS"}, 
  {"name": "Seychelles", "code": "SC"}, 
  {"name": "Sierra Leone", "code": "SL"}, 
  {"name": "Singapore", "code": "SG"}, 
  {"name": "Slovakia", "code": "SK"}, 
  {"name": "Slovenia", "code": "SI"}, 
  {"name": "Solomon Islands", "code": "SB"}, 
  {"name": "Somalia", "code": "SO"}, 
  {"name": "South Africa", "code": "ZA"}, 
  {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
  {"name": "Spain", "code": "ES"}, 
  {"name": "Sri Lanka", "code": "LK"}, 
  {"name": "Sudan", "code": "SD"}, 
  {"name": "Suriname", "code": "SR"}, 
  {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
  {"name": "Swaziland", "code": "SZ"}, 
  {"name": "Sweden", "code": "SE"}, 
  {"name": "Switzerland", "code": "CH"}, 
  {"name": "Syrian Arab Republic", "code": "SY"}, 
  {"name": "Taiwan, Province of China", "code": "TW"}, 
  {"name": "Tajikistan", "code": "TJ"}, 
  {"name": "Tanzania, United Republic of", "code": "TZ"}, 
  {"name": "Thailand", "code": "TH"}, 
  {"name": "Timor-Leste", "code": "TL"}, 
  {"name": "Togo", "code": "TG"}, 
  {"name": "Tokelau", "code": "TK"}, 
  {"name": "Tonga", "code": "TO"}, 
  {"name": "Trinidad and Tobago", "code": "TT"}, 
  {"name": "Tunisia", "code": "TN"}, 
  {"name": "Turkey", "code": "TR"}, 
  {"name": "Turkmenistan", "code": "TM"}, 
  {"name": "Turks and Caicos Islands", "code": "TC"}, 
  {"name": "Tuvalu", "code": "TV"}, 
  {"name": "Uganda", "code": "UG"}, 
  {"name": "Ukraine", "code": "UA"}, 
  {"name": "United Arab Emirates", "code": "AE"}, 
  {"name": "United Kingdom", "code": "GB"}, 
  {"name": "United States", "code": "US"}, 
  {"name": "United States Minor Outlying Islands", "code": "UM"}, 
  {"name": "Uruguay", "code": "UY"}, 
  {"name": "Uzbekistan", "code": "UZ"}, 
  {"name": "Vanuatu", "code": "VU"}, 
  {"name": "Venezuela", "code": "VE"}, 
  {"name": "Viet Nam", "code": "VN"}, 
  {"name": "Virgin Islands, British", "code": "VG"}, 
  {"name": "Virgin Islands, U.S.", "code": "VI"}, 
  {"name": "Wallis and Futuna", "code": "WF"}, 
  {"name": "Western Sahara", "code": "EH"}, 
  {"name": "Yemen", "code": "YE"}, 
  {"name": "Zambia", "code": "ZM"}, 
  {"name": "Zimbabwe", "code": "ZW"} 
];

var continents = { /*Country Code:"Continent Code"*/
  AD:"EU",
  AE:"AS",
  AF:"AS",
  AG:"NA",
  AI:"NA",
  AL:"EU",
  AM:"AS",
  AN:"NA",
  AO:"AF",
  AP:"AS",
  AQ:"AN",
  AR:"SA",
  AS:"OC",
  AT:"EU",
  AU:"OC",
  AW:"NA",
  AX:"EU",
  AZ:"AS",
  BA:"EU",
  BB:"NA",
  BD:"AS",
  BE:"EU",
  BF:"AF",
  BG:"EU",
  BH:"AS",
  BI:"AF",
  BJ:"AF",
  BL:"NA",
  BM:"NA",
  BN:"AS",
  BO:"SA",
  BR:"SA",
  BS:"NA",
  BT:"AS",
  BV:"AN",
  BW:"AF",
  BY:"EU",
  BZ:"NA",
  CA:"NA",
  CC:"AS",
  CD:"AF",
  CF:"AF",
  CG:"AF",
  CH:"EU",
  CI:"AF",
  CK:"OC",
  CL:"SA",
  CM:"AF",
  CN:"AS",
  CO:"SA",
  CR:"NA",
  CU:"NA",
  CV:"AF",
  CX:"AS",
  CY:"AS",
  CZ:"EU",
  DE:"EU",
  DJ:"AF",
  DK:"EU",
  DM:"NA",
  DO:"NA",
  DZ:"AF",
  EC:"SA",
  EE:"EU",
  EG:"AF",
  EH:"AF",
  ER:"AF",
  ES:"EU",
  ET:"AF",
  EU:"EU",
  FI:"EU",
  FJ:"OC",
  FK:"SA",
  FM:"OC",
  FO:"EU",
  FR:"EU",
  FX:"EU",
  GA:"AF",
  GB:"EU",
  GD:"NA",
  GE:"AS",
  GF:"SA",
  GG:"EU",
  GH:"AF",
  GI:"EU",
  GL:"NA",
  GM:"AF",
  GN:"AF",
  GP:"NA",
  GQ:"AF",
  GR:"EU",
  GS:"AN",
  GT:"NA",
  GU:"OC",
  GW:"AF",
  GY:"SA",
  HK:"AS",
  HM:"AN",
  HN:"NA",
  HR:"EU",
  HT:"NA",
  HU:"EU",
  ID:"AS",
  IE:"EU",
  IL:"AS",
  IM:"EU",
  IN:"AS",
  IO:"AS",
  IQ:"AS",
  IR:"AS",
  IS:"EU",
  IT:"EU",
  JE:"EU",
  JM:"NA",
  JO:"AS",
  JP:"AS",
  KE:"AF",
  KG:"AS",
  KH:"AS",
  KI:"OC",
  KM:"AF",
  KN:"NA",
  KP:"AS",
  KR:"AS",
  KW:"AS",
  KY:"NA",
  KZ:"AS",
  LA:"AS",
  LB:"AS",
  LC:"NA",
  LI:"EU",
  LK:"AS",
  LR:"AF",
  LS:"AF",
  LT:"EU",
  LU:"EU",
  LV:"EU",
  LY:"AF",
  MA:"AF",
  MC:"EU",
  MD:"EU",
  ME:"EU",
  MF:"NA",
  MG:"AF",
  MH:"OC",
  MK:"EU",
  ML:"AF",
  MM:"AS",
  MN:"AS",
  MO:"AS",
  MP:"OC",
  MQ:"NA",
  MR:"AF",
  MS:"NA",
  MT:"EU",
  MU:"AF",
  MV:"AS",
  MW:"AF",
  MX:"NA",
  MY:"AS",
  MZ:"AF",
  NA:"AF",
  NC:"OC",
  NE:"AF",
  NF:"OC",
  NG:"AF",
  NI:"NA",
  NL:"EU",
  NO:"EU",
  NP:"AS",
  NR:"OC",
  NU:"OC",
  NZ:"OC",
  OM:"AS",
  PA:"NA",
  PE:"SA",
  PF:"OC",
  PG:"OC",
  PH:"AS",
  PK:"AS",
  PL:"EU",
  PM:"NA",
  PN:"OC",
  PR:"NA",
  PS:"AS",
  PT:"EU",
  PW:"OC",
  PY:"SA",
  QA:"AS",
  RE:"AF",
  RO:"EU",
  RS:"EU",
  RU:"EU",
  RW:"AF",
  SA:"AS",
  SB:"OC",
  SC:"AF",
  SD:"AF",
  SE:"EU",
  SG:"AS",
  SH:"AF",
  SI:"EU",
  SJ:"EU",
  SK:"EU",
  SL:"AF",
  SM:"EU",
  SN:"AF",
  SO:"AF",
  SR:"SA",
  ST:"AF",
  SV:"NA",
  SY:"AS",
  SZ:"AF",
  TC:"NA",
  TD:"AF",
  TF:"AN",
  TG:"AF",
  TH:"AS",
  TJ:"AS",
  TK:"OC",
  TL:"AS",
  TM:"AS",
  TN:"AF",
  TO:"OC",
  TR:"EU",
  TT:"NA",
  TV:"OC",
  TW:"AS",
  TZ:"AF",
  UA:"EU",
  UG:"AF",
  UM:"OC",
  US:"NA",
  UY:"SA",
  UZ:"AS",
  VA:"EU",
  VC:"NA",
  VE:"SA",
  VG:"NA",
  VI:"NA",
  VN:"AS",
  VU:"OC",
  WF:"OC",
  WS:"OC",
  YE:"AS",
  YT:"AF",
  ZA:"AF",
  ZM:"AF",
  ZW:"AF",
};

countries.forEach(function(obj) {
  var newObj = obj;
  newObj['cont'] = continents[obj['code']] 
  countryCont.push(newObj);
});

popNodes();
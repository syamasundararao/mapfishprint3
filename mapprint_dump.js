
var specs=
{
  "layout": 'A4 portrait',
	"bbox": [5, 45, 6, 46],

 "srs":"EPSG:4326",
 "units":"degrees",
 "dpi":300,
 "mapTitle":"MapTitle",
 "mapcomment":"Map Comment",
 "layers":[
 {
    "baseURL":"http://localhost:9090/geoserver/test/wms",
    "opacity":1.0,
    "singleTile":false,
    "type":"WMS",
    "layers":["test:IND_water_areas"],
    "format":"image/png"
 }
 ],
 "pages":[
 {
    "center":[78.9,20.5],
    "scale":16000000,
	"comment":"Map Comment",
	"layout":"NHP"
 }
 ]
};

$("#export-pdf").click(function(){
var json = JSON.stringify(specs);
alert(json);
$.ajax(
{
  url:'http://localhost:9090/geoserver/pdf/print.pdf',
  type: 'GET',
    xhrFields: {
            responseType: 'blob'
        },
  data:
  {
    spec: json
  },
  success: function(response)
  {
	
          const url = window.webkitURL.createObjectURL(response);
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
         // downloadLink.download = `test.pdf`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
	alert('success')    
  },
  error: function()
  {
    alert("Failure");
  }
});
});
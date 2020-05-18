console.log(map)
var specs={
  "layout": 'A3',
	"bbox": [5, 45, 6, 46],

 "srs":"EPSG:4326",
 "units":"degrees",
 "dpi":300,
 "mapTitle":"MapTitle",
 "mapcomment":"Map Comment",
 "outputFilename":'print-${yyyyMMddHHmmss}',
 "layers":[

 {
    "baseURL":"http://localhost:9090/geoserver/test/wms",
    "opacity":1.0,
    "singleTile":false,
    "type":"WMS",
    "layers":["test:IND_water_areas"],
    "format":"image/png",
	"geodetic": true
 },

 
 ],
 "pages":[
 {
    "center":[78.9,20.5],
    "scale":20000000,
	"comment":"Map Comment",
	"layout":"NHP",
	
 }
 ],
 "legends" : [{
			"name" : "Geo",
			"classes" : [{
					"name" : "",
					"icon" : "http://localhost:9090/geoserver/wms?version=1.3.0&TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&EXCEPTIONS=application/vnd.ogc.se_xml&LAYER=test:IND_water_areas&FORMAT=image/png"
				}
			]
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
		  downloadLink.target='_blank';
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
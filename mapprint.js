console.log(map)
var specs={
        "layout":"A4",
        "srs": "EPSG:4326",
         "units":"degrees",
        "dpi":300,
        "mapTitle":"Map Title",
        "comment":"This is my comment.",
        "outputFilename":"test.jpg",
        "layers":[
          {
            "baseURL":"https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms",
            "singleTile":false,
            "type":"WMS",
            "layers":["india3"],
             
			 "format":"image/png"
           // "resolutions":[156543.03390625,78271.516953125,39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245256282, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717,0.41999977320012255, 0.2799998488000817,0.13999992440004086, 0.08399995464002451, 0.05599996976001634, 0.02799998488000817]
          },
		  {
            "baseURL":"http://localhost:9090/geoserver/test/wms",
            "opacity":1.0,
            "singleTile":false,
            "type":"WMS",
            "layers":["test:IND_adm2"],
            "format":"image/png",
			"overview":true
          },
		  {
            "baseURL":"http://localhost:9090/geoserver/test/wms",
            "opacity":1.0,
            "singleTile":false,
            "type":"WMS",
            "layers":["test:IND_rails"],
            "format":"image/png",
			"overview":true
          },
          {
            "baseURL":"http://localhost:9090/geoserver/test/wms",
            "opacity":1.0,
            "singleTile":false,
            "type":"WMS",
            "layers":["test:IND_water_areas"],
            "format":"image/png",
			"overview":true
          },
		    
        ],
        "pages":[
          {
          
            "rotation":0,
			  "center":[81.424,22.4156],
				"scale":20000000
          }
        ]
      }

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
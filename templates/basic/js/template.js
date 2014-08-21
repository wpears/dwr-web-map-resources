
// Include modules That you want to use in your application. The first argument is an array of
// strings identifying the modules to be included and the second argument is a function that gets
// its arguments populated by the return value of the module. Order matters.
require([
  "esri/map",
  "esri/geometry/Extent",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/FeatureLayer",
  "esri/dijit/Scalebar",
  "esri/dijit/BasemapToggle",
  "esri/dijit/InfoWindow",

  "dojo/ready",
  "dojo/_base/Color",
  "dojo/parser",
  "dojo/on",

  "modules/measuretool.js",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane"], 

function(
   Map,
   Extent,
   ArcGISDynamicMapServiceLayer,
   FeatureLayer,
   Scalebar,
   BasemapToggle,
   InfoWindow,

   ready,
   Color,
   parser,
   on,

   MeasureTool,
   SimpleLineSymbol,
   SimpleMarkerSymbol,
   BorderContainer,
   ContentPane){

//Disable CORS detection, since services.arcgisonline.com is not CORS enabled
esri.config.defaults.io.corsDetection = false;


  // Fires when the DOM is ready and all dependencies are resolved. Usually needed when using dijits.
  ready(function() {
    var layers = []
      , measureAnchor = document.getElementById('measureAnchor')
      ;



  // Parse widgets included in the HTML. In this case, the BorderContainer and ContentPane.
  // data-dojo -types and -props get analyzed to initialize the application properly.
    parser.parse();


  // Choose your initial extent. The easiest way to find this is to pan around the map, checking the
  // current extent with 'esri.map.extent' in the Javascript console (F12 to open it)
    var initialExtent = new Extent({
      xmin : -13738052,
      ymin : 4478332,
      xmax : -13272092,
      ymax : 4761454,
      spatialReference:{
        wkid : 102100
      }
    });


  // Create infoWindow to assign the the map.
    var infoWindow = new InfoWindow('infoWindow');


  // Create the map. The first argument is either an HTML element (usually a div) or, as in this case,
  // the id of an HTML element as a string. See https://developers.arcgis.com/en/javascript/jsapi/map-amd.html#map1
  // for the full list of options that can be passed in the second argument.
    var map = new Map("centerPane", {
      basemap : "topo",
      extent : initialExtent,
      infoWindow : infoWindow
    });
    

  //Once the map is loaded, set the infoWindow's size. And turn in off and on to prevent a flash of
  //unstyled content on the first point click. This is a bug in the API.
    map.on("load", function(){
      infoWindow.resize(250,275);
      infoWindow.show(0,0);
      setTimeout(function(){infoWindow.hide()},0);
    });


  // Expose the map as part of the esri global object. Useful for debugging and trying out modifications to
  // the map object directly in the console. This could also be done by creating a variable outside of the
  // require statement, but it can be dangerous creating too many global variables (especially with common
  // names), as they can 'collide', leaving you with a variable pointing to the wrong object.
    esri.map = map;


  // Dynamic map services allow you to bring in all the layers of a map service at once. These are rendered
  // by the server on the fly into map tiles and served out to the user. This is somewhat slower than serving
  // a cached map, but is needed for maps/data that are often updated or that needs to be queried/updated
  // dynamically (e.g., with a definition query). It is also much easier to use a dynamic map service when
  // creating and testing an application, then converting it to a cached service in production, then recaching
  // every time you need to alter the service.

  //Uncomment this code to include the layer.
 /*   var dynamicUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer";
  * var lyrUSA = new ArcGISDynamicMapServiceLayer(dynamicUrl, {
  *       opacity : 0.5
  *     });
  * layers.push(lyrUSA);
  */


  // Feature layers are likely the best way to interact with individual datasets of any size.
  // A feature layer points to a layer in a map service and pulls data into the browser where it can be
  // queried on/selected/edited without incurring a roundtrip to the server (hundreds of times slower).
  // Supports three feature request modes:
  // Snapshot: when you have AT MOST a few hundred features. Pulls all the data into your map, requiring
  //           no server requests for pans and zooms. Fast, but will slow you down if you have too many features
  // On Demand: the default mode. Only gets data when needed, i.e. if it is in the current extent and 
  //           current time extent. Allows your service to contain thousands of features when zoomed in,
  //           which are loaded when they are panned/zoomed to.
  // Selection: Allows retrieval of data only when items are selected.
  //
  // Also, allows maxAllowableOffset to be set, allowing your line and polygon features to be generalized
  // on the fly. This is often a huge performance benefit, especially if you have many detailed lines or polygons.
    var featureUrl ="http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Earthquakes/EarthquakesFromLastSevenDays/MapServer/0"
    var lyrQuakes = new FeatureLayer(featureUrl,
      {
        mode:FeatureLayer.MODE_SNAPSHOT,
        outFields:['latitude','longitude','magnitude','region','eqid','datetime']
      });
    lyrQuakes.setDefinitionExpression('objectid >= 30 AND magnitude >= 2.0');
    layers.push(lyrQuakes);


  // Add layers to map
    map.addLayers(layers);


  // Add dijits to the application


  // Initialize basemap toggle dijit. The basemap argument is the one to which you will toggle, the string
  // is, like with the Map constructor, an id of an HTML element.
    var toggle = new BasemapToggle({
      map : map,
      basemap : "satellite"
      }, "basemapToggle");
    toggle.basemaps.topo.label="Topo"
    toggle.startup();


  // Scalebar dijit. Somewhat limited in design, though alternate designs are available.
    var dijitScalebar = new Scalebar({
      map : map,
      scalebarUnit : "dual",
      attachTo : "bottom-left"
    });


  // Measurement widget. This is a wrapper around the API's measurement dijit. Features of the wrapper involve
  // a tool manager that allows multiple tools to work together and the ability for the measure tool to
  // prevent map events from firing when measurement is enabled. The anchor is an HTML element when
  // the button will go, the next argument is the line that the dijit creates, the third is the symbol for points
  // and line vertices, and the last optional argument is an array that takes a reference to the map
  // and an array of features that events should be paused on 
    var measureTool = MeasureTool( measureAnchor
                                 , new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 2)
                                 , new SimpleMarkerSymbol({"size":6,"color":new Color([0, 0, 0])})
                                 , { map:map
                                   , eventFeatures:[lyrQuakes]
                                   }
                                 );  
  

  // Register map handlers.


  // When a quake point is clicked, its information, stored in the graphic, is
  // accessed and used to populate the infoWindow. A handler is added for the created zoomTo
  // link (and the last handler is disconnected if it exists)
    on(lyrQuakes, "click", function(e){
      var attr = e.graphic.attributes
        , title = '<a id="zoomLink" action="javascript:void(0)">Earthquake ' + attr.eqid+'</a>'
        , content ='<ul class="poplist">'+
                    '<li><span class="poptitle">Date:&nbsp;</span>'+(new Date(attr.datetime)).toLocaleDateString()+'</li>'+
                    '<li><span class="poptitle">Time:&nbsp;</span>'+(new Date(attr.datetime)).toLocaleTimeString()+'</li>'+
                    '<li><span class="poptitle">Latitude:&nbsp;</span>'+attr.latitude+'</li>'+
                    '<li><span class="poptitle">Longitude:&nbsp;</span>'+attr.longitude+'</li>'+
                    '<li><span class="poptitle">Magnitude:&nbsp;</span>'+attr.magnitude+'</li>'+
                    '<li><span class="poptitle">Region:&nbsp;</span>'+attr.region+'</li>'+
                    '<li><span class="poptitle">DWR Logo:&nbsp;</span><img src="images/dwr.png"></img></li>'+
                   '</ul>';          
      infoWindow.setTitle(title);
      infoWindow.setContent(content);
      infoWindow.show(e.screenPoint);

      if(infoWindow.zoomHandler)
        infoWindow.zoomHandler.remove();
      infoWindow.zoomHandler = on(document.getElementById('zoomLink'),'click',function(){
        map.centerAndZoom(e.mapPoint,12)
      });     
    });


  // Initialize measurement dijit on first click. This allows you to save code execution time until it is
  // actually needed. on.once will disconnect the handler after this runs once. The dijit internally
  // applies its own handlers afterward.
  on.once(measureAnchor,"mousedown", function(e){measureTool.init(e)});



  });
});

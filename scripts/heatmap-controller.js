// map center
var myLatlng = new google.maps.LatLng(40.7389764622, -111.90111625);
// map options,
var myOptions = {
  zoom: 13,
  center: myLatlng
};
// standard map
map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

// the defaults
var defaultRadius = .002;
var defaultMaxOpacity = .7;
var defaultLocalExtrema = false;
// heatmap layer
var heatmap = new HeatmapOverlay(map, 
  {
    "radius": .002,
    "maxOpacity": .7, 
    // if true, scales the radius based on map zoom
    "scaleRadius": true, 
    "useLocalExtrema": false,
    // messed up with lat and longitude labels
    latField: 'lng',
    // messed up with lat and longitude labels
    lngField: 'lat',
    valueField: 'count'
  }
);
// add the basic data
heatmap.setData(basicDataset);
heatmap.addData(mediumDataset);


/* -- Menu Functionality -- */

/* Toggle Menu */
function toggleMenuButton() {
  var toggleMenu = document.getElementById('menu').classList.toggle("menu-open");
  var closeButton = document.getElementById('menu-toggle').classList.toggle("hidden-menu");
}


/* -- Settings Functionality -- */

/* Global Variables that are used to reconfig on submit */
var radius = defaultRadius;
var maxOpacity = defaultMaxOpacity;
var useLocalExtrema = defaultLocalExtrema;

/* Change Radius */
function toggleLocalExtrema(element) {
  /* Update radius to .0015 if extrema (otherwise the radius is too big) */
  updateRadiusLimits(.001, .002, .0015, .0005);
  radius = .0015;
  
  /* Otherwise set the defaults */
  if (!element.checked) {
    var radius = defaultRadius;
    updateRadiusLimits(0.001, .01, .003, .001);
  }
  
  modifyConfig(radius, defaultMaxOpacity, element.checked);
}

/* Update the radius input element */
function updateRadiusLimits(min, max, value, step) {
  var radiusInput = document.getElementById("radius");
  radiusInput.setAttribute("min", min);
  radiusInput.setAttribute("max", max);
  radiusInput.setAttribute("value", value);
  radiusInput.setAttribute("step", step);
}

// TODO: Add dataset variable for the datasets to add
/* Reconfgure and reload the map */
function modifyConfig(radius, maxOpacity, useLocalExtrema) {
  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  heatmap = new HeatmapOverlay(map,
  {
    "radius": radius,
    "maxOpacity": maxOpacity, 
    // if true, scales the radius based on map zoom
    "scaleRadius": true, 
    "useLocalExtrema": useLocalExtrema,
    // messed up with lat and longitude labels
    latField: 'lng',
    // messed up with lat and longitude labels
    lngField: 'lat',
    valueField: 'count'
  });

  heatmap.setData(basicDataset);
  heatmap.addData(mediumDataset);
}
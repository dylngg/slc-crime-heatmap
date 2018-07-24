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
var defaultBlur = .85;
// heatmap layer
var heatmap = new HeatmapOverlay(map, 
  {
    "radius": defaultRadius,
    "maxOpacity": defaultMaxOpacity, 
    // if true, scales the radius based on map zoom
    "scaleRadius": true, 
    "useLocalExtrema": defaultLocalExtrema,
    "blur": defaultBlur,
    // messed up with lat and longitude labels
    latField: "lat",
    // messed up with lat and longitude labels
    lngField: "lng",
    valueField: "count"
  }
);
// add the basic data
heatmap.setData(firstDataset(cases2016));
heatmap.addData(cases2017);
function firstDataset(dataset) {
  var new_dataset = {'max': 10, 'data': dataset}
  return new_dataset;
}


/* ---- Menu Functionality ---- */

/* Toggle Menu */
function toggleMenuButton() {
  var toggleMenu = document.getElementById('menu').classList.toggle("menu-open");
  var closeButton = document.getElementById('menu-toggle').classList.toggle("hidden-menu");
}


/* -------- Settings Functionality -------- */

/* Global Variables that are used to reconfig on submit */
var radius = defaultRadius;
var maxOpacity = defaultMaxOpacity;
var useLocalExtrema = defaultLocalExtrema;
var blur = defaultBlur;
var datasetsToAnalyze = [];


/* ---- Update Values from Menu ---- */

/* Update map config with globals on submit */
function updateMap() {
  // process years
  var leftYear = document.getElementById("firstyear").value;
  var rightYear = document.getElementById("lastyear").value;
  
  // get range out of years and swap left and right if applicable
  datasetsToAnalyze = [this['cases' + leftYear]];
  if (leftYear > rightYear) 
    rightYear = [leftYear, leftYear = rightYear][0];
  
  while (leftYear <= rightYear) {
    datasetsToAnalyze.push(this['cases' + leftYear++]);
  }
  
  // load the data and refresh the map
  modifyConfig();
}
/* Change Local Extrema */
function setLocalExtrema(element) {
  useLocalExtrema = element.checked;
  
  /* Set the defaults */
  if (!element.checked) {
    radius = defaultRadius;
    updateRadiusLimits(0.0005, .01, .003, .0005);
  } else {
    /* Update radius to .0015 if extrema (otherwise the radius is too big) */
    radius = .0015;
    updateRadiusLimits(.0005, .005, .0015, .0005);
  }
}
/* Change Radius */
function setRadius(element) {
  radius = element.value;
}
/* Change Opacity */
function setOpacity(element) {
  maxOpacity = element.value;
}
/* Change Blur*/
function setBlur(element) {
  blur = element.value;
}
/* Update the radius input element */
function updateRadiusLimits(min, max, value, step) {
  var radiusInput = document.getElementById("radius");
  radiusInput.setAttribute("min", min);
  radiusInput.setAttribute("max", max);
  radiusInput.setAttribute("value", value);
  radiusInput.setAttribute("step", step);
}


/* ---- Change the map ---- */

// TODO: Add dataset variable for the datasets to add
/* Reconfgure and reload the map using globals */
function modifyConfig() {
  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  heatmap = new HeatmapOverlay(map,
  {
    "radius": radius,
    "maxOpacity": maxOpacity, 
    // if true, scales the radius based on map zoom
    "scaleRadius": true, 
    "blur": blur,
    "useLocalExtrema": useLocalExtrema,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  });

  heatmap.setData(firstDataset(datasetsToAnalyze[0]));
  for (var i = 0; i < datasetsToAnalyze.length - 1; i++) {
    heatmap.addData(datasetsToAnalyze[i]);
  }
}
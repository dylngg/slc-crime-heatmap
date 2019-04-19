# slc-crime-heatmap
A heatmap of crime in Salt Lake City on the web.

![SLC Crime Heatmap](https://raw.githubusercontent.com/dylngg/slc-crime-heatmap/master/images/heatmap-screenshot.png "Heatmap of crime in SLC")
The heatmap is based off of [Salt Lake City's Police Cases](https://opendata.utah.gov/Public-Safety/). To create the heatmap, I changed the x & y coordinates to a global coordinate system and had to clean up some of the data. You can view the raw data, along with my modifications in the raw-data folder.

## View It Live
You can view the web heatmap live [here](https://dylngg.github.io/slc-crime-heatmap/)

## Running it yourself
To run it yourself, you'll want to download this repository and get a google maps api key (since the current key is restricted to [https://dylngg.github.io/slc-crime-heatmap/](https://dylngg.github.io/slc-crime-heatmap/)). Enter that key in the `index.html`, where `<script src="https://maps.googleapis.com/maps/api/js?key=KEY&sensor=false"></script>` appears with an actual key. After that, you should be able to open the heatmap by opening `index.html`.

### Running the geolocation conversion script
To run the script which converts the x and y location data of the crime from EPSG:32043 to WGS84, you'll need the `pandas` and `pyproj` modules.

To install the required modules, run:

```$ pip install pandas pyproj``` 

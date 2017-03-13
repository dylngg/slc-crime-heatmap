# slc-crime-heatmap
A heatmap of crime in Salt Lake City on the web.

![SLC Crime Heatmap](https://raw.githubusercontent.com/dylngg/slc-crime-heatmap/master/images/heatmap-screenshot.png "Heatmap of crime in SLC")
The heatmap is based off of about small percentage (I couldn't map all 47k crimes) of [Salt Lake City's 2016 Police Cases](https://opendata.utah.gov/Public-Safety/SALT-LAKE-CITY-POLICE-CASES-2016/trgz-4r9d). To create the heatmap, I changed the x & y coordinates to a global coordinate system and had to clean up some of the data. You can view the raw data, along with my modifications in the raw-data folder.  


##Installation
To install, simply download the repo and start a webserver.
Clone the repo and change directory:
```
$ git clone https://github.com/dylngg/slc-crime-heatmap.git
$ cd slc-crime-heatmap
```

Start a webserver (e.g. python SimpleHTTPServer from the project directory root):
`python -m SimpleHTTPServer 8888`

###Running the geolocation conversion script
To run the script which converts the x and y location data of the crime from EPSG:32043 to WGS84, you'll need the `pandas` and `pyproj` modules.
To install the required modules, run:
```$ pip install pandas pyproj``` 

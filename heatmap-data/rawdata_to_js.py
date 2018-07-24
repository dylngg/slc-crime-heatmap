import pandas as pd
import numpy as np
import pyproj
import io

# 45.26099227149098, -95.30231134029707
def main(args):
    years = range(2007, 2018)
    for year in years:
        path = 'raw-data/policeCases' + str(year) + '.csv'
        df = pd.read_csv(path)  # Read the cases

        df = clean_data(df, year).reset_index(drop=True)
        x = df['x_coordinate'].values.tolist()
        y = df['y_coordinate'].values.tolist()

        # Convert wgs84 coordinate system into lon, lat
        epsg32043 = pyproj.Proj("+init=EPSG:32043", preserve_units=True)
        wgs84 = pyproj.Proj("+init=EPSG:4326", preserve_units=True)
        lng, lat = pyproj.transform(epsg32043, wgs84, x, y)

        # Set the values
        [df.set_value(x, 'lat', lat[x]) for x, item in enumerate(df['x_coordinate'])]
        [df.set_value(y, 'lng', lng[y]) for y, item in enumerate(df['y_coordinate'])]

        df = df[['lat', 'lng']]

        # Count the duplicates
        duplicates = df.groupby(df.columns.tolist()).size().reset_index()
        df = duplicates.rename(columns={0:'count'})

        # Export
        json = df.to_json(orient='records')
        json = 'var cases{} = '.format(str(year)) + json

        # Create file and write out to it
        with io.FileIO("clean-data/{}.js".format(str(year)), "w") as json_file:
            json_file.write(bytes(json, 'UTF-8'))

def clean_data(df, year):
    # Clean the Data
    df.replace('', np.nan, inplace=True)  # Replace blank items with NaN
    df.replace(111111111.0, np.nan, inplace=True)  # Replace invalid 111... items with NaN
    df.replace(0.0, np.nan, inplace=True)  # Replace invalid 0 items with NaN
    df = df.dropna(subset=['x_coordinate', 'y_coordinate'])  # Drop any rows that have NaN

    # Organize and Export
    df = df[['x_coordinate', 'y_coordinate']]  # get just the coordinates
    df.to_csv('clean-data/' + str(year) + '.csv')

    return df


if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))

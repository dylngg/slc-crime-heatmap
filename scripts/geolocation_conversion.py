import pandas as pd
import pyproj


def main(args):
    csv_file = '../raw-data/clean_xy_coordinates.csv'
    df = pd.read_csv(csv_file)
    x = df['X-COORDINATE'].values.tolist()
    y = df['Y_COORDINATE'].values.tolist()
    
    epsg32043 = pyproj.Proj("+init=EPSG:32043", preserve_units=True)
    wgs84 = pyproj.Proj("+init=EPSG:4326", preserve_units=True)
    lon, lat = pyproj.transform(epsg32043, wgs84, x, y)
    
    [df.set_value(x, 'X-COORDINATE', lat[x]) for x, item in enumerate(df['X-COORDINATE'])]
    [df.set_value(y, 'Y_COORDINATE', lon[y]) for y, item in enumerate(df['X-COORDINATE'])]
    print(df)
    df.to_csv('../raw-data/clean_coordinates.csv') 


if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))

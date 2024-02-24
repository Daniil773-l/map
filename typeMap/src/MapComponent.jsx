import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileArcGISRest from 'ol/source/TileArcGISRest';
import Button from '@material-ui/core/Button';

import 'ol/ol.css';

const MapComponent = () => {
    const [mapType, setMapType] = useState('osm');

    useEffect(() => {
        const map = new Map({
            target: 'map',
            layers: [renderMapLayers()],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        return () => {
            map.dispose();
        };
    }, [mapType]);

    const handleChangeMapType = (type) => {
        setMapType(type);
    };

    const renderMapLayers = () => {
        switch (mapType) {
            case 'osm':
                return new TileLayer({
                    source: new OSM(),
                });
            case 'satellite':
                return new TileLayer({
                    source: new TileArcGISRest({
                        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                    }),
                });
            default:
                return new TileLayer({
                    source: new OSM(),
                });
        }
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }} />
            <div style={{ marginTop: '10px' }}>
                <Button onClick={() => handleChangeMapType('osm')} variant={mapType === 'osm' ? 'contained' : 'outlined'}>
                    OSM
                </Button>
                <Button onClick={() => handleChangeMapType('satellite')} variant={mapType === 'satellite' ? 'contained' : 'outlined'}>
                    Satellite
                </Button>
            </div>
        </div>
    );
};

export default MapComponent;

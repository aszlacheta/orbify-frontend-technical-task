import { FC, useEffect, useMemo } from 'react';
import { AreaOfInterests } from '../../api/generated.ts';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Fill, Stroke, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import { SimpleGeometry } from 'ol/geom';
import styles from './ProjectDetailsDialogMap.module.css';
import 'ol/ol.css';

interface ProjectDetailsDialogMapProps {
    areaOfInterest: AreaOfInterests;
}

const MAP_ID = 'map';

const featureConfig = {
    featureProjection: 'EPSG:3857',
    dataProjection: 'EPSG:4326'
};

const style = new Style({
    stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3,
    }),
    fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
    }),
});

export const ProjectDetailsDialogMap: FC<ProjectDetailsDialogMapProps> = ({ areaOfInterest }) => {
    const osmLayer = useMemo(() => new TileLayer({
        preload: Infinity,
        source: new OSM(),
    }), []);

    const view = useMemo(() => new View({
        center: [0, 0],
        zoom: 0,
    }), []);

    const vectorSource = useMemo(() => new VectorSource({
        features: new GeoJSON().readFeatures(areaOfInterest, featureConfig),
        format: new GeoJSON(),
    }), [areaOfInterest]);

    const vectorLayer = useMemo(() => new VectorLayer({
        source: vectorSource,
        style,
    }), [vectorSource]);

    useEffect(() => {
        const map = new Map({
            target: MAP_ID,
            layers: [osmLayer, vectorLayer],
            view,
        });

        // center to geojson
        const feature = vectorSource.getFeatures()[0];
        const polygon = feature.getGeometry();

        if (polygon) {
            view.fit(polygon as SimpleGeometry, { padding: [50, 50, 50, 50] });
        }

        return () => map.setTarget(undefined);
    }, [vectorLayer, vectorSource, osmLayer, areaOfInterest, view]);


    return (
        <div className={styles.map} id={MAP_ID}/>
    );
};

import React, { Component } from 'react';
// const { Map, TileLayer, Marker, Popup } = 'react-leaflet';
import { Map, TileLayer} from 'react-leaflet';
import '../style/Map.css';
import GogoroMarker from './GogoroMarker.js';
class MapComponent extends Component {
    render() {
        const { latitude, longitude, station } = this.props;
        const position = [latitude, longitude];
        return (
            <Map center={position} zoom={11}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {
                    station.map((elem, idx) => {
                        return <GogoroMarker key={idx} position={[elem.Latitude, elem.Longitude]} stationName={JSON.parse(elem.LocName).List[1].Value} idx={2000} />;
                    })
                }
            </Map>
        );
    }
}

export default (MapComponent);
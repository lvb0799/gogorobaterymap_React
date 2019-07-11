import React, { Component } from 'react';
import {Marker, Popup } from 'react-leaflet';
class GogoroMarker extends Component {
    render() {
        const {position,stationName,idx}=this.props;
        return (
            <Marker key={`marker-${idx}`} position={position}>
                <Popup>
                    <span>{stationName}</span>
                </Popup>
            </Marker>
        );
    }
}

export default (GogoroMarker);
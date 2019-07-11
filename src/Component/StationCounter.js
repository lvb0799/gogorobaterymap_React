import React, { Component } from 'react';

class StationCounter extends Component {
    render() {
        const {count}=this.props;
        return (
            <label>範圍充電站數量<span id='stationcount'>({count})</span></label>
        );
    }
}

export default (StationCounter);
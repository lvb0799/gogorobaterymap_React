import React, { Component } from 'react';
import CitySelect from './CitySelect.js';
import AreaSelect from './AreaSelect.js';
import StationCounter from './StationCounter.js';
import '../style/Query.css';

class QueryComponent extends Component {

    constructor(props)
    {
        super(props);
        this.uniqueCityData=this.uniqueCityData.bind(this);
    }
    uniqueCityData(data) {
        var distinctData = [];
        data.map( (elem, idx) => {
            let tmpCity = { "cityName": elem.COUNTYNAME, "cityID": elem.COUNTYID };
            if (distinctData.filter((x) => x.cityName == tmpCity.cityName) == 0)
                distinctData.push(tmpCity);
        });
        distinctData = distinctData.sort(function (a, b) {
            return a.cityID > b.cityID ? 1 : -1;
        })
        return distinctData;
    };
    
    render() {
        const {zipcode,station,chooseCity,chooseArea,onChangeCity,onChangeArea}=this.props;
        const cityData=this.uniqueCityData(zipcode);
        const areaData=(chooseCity=='all') ? zipcode:zipcode.filter((elem)=>{return elem.COUNTYNAME==chooseCity});
        //console.log(areaData);
        return (
            <div id='QueryComponent'>
                <h1>GOGORO 充電站地圖</h1>
                <section>
                    <label htmlFor='city'>請選擇城市</label>
                    <CitySelect cityData={cityData} onChangeCity={onChangeCity}/>
                    <label htmlFor='area'>請選擇行政區</label>
                    <AreaSelect zipcode={areaData} chooseArea={chooseArea} onChangeArea={onChangeArea}/>
                    <StationCounter count={station.length}/>
                </section>
            </div>
        );
    }
}

export default (QueryComponent);
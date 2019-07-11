import React, { Component } from 'react';
import QueryComponent from './Component/QueryComponent.js';
import MapComponent from './Component/MapComponent.js';
import zipcodeJson from './json/zipcode.json';
import './style/App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.getGOGOROData = this.getGOGOROData.bind(this);
    this.getTargetLocation=this.getTargetLocation.bind(this);
  }
  state = {
    latitude: 0,
    longitude: 0,
    zipcode: [],
    station: [],
    chooseCity: 'all',
    chooseArea: 'all',
  }
  componentDidMount() {
    this.getGOGOROData();
    if (navigator.geolocation) {
      // HTML5 定位抓取
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zipcode: zipcodeJson,
        });
      },
        (error) => {
          switch (error.code) {
            case error.TIMEOUT:
              alert('TIMEOUT');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('POSITION_UNAVAILABLE');
              break;
            case error.PERMISSION_DENIED: // 拒絕
              alert('PERMISSION_DENIED');
              break;
            case error.UNKNOWN_ERROR:
              alert('UNKNOWN_ERROR');
              break;
            default:
              break;
          }
        });
    }
  }
  getGOGOROData(initRun) {
    let url = 'https://wapi.gogoro.com/tw/api/vm/list/';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ station: data.data, })
      })
      .catch(err => console.log(err))
  }
  onChangeCity = (e) => {
    const location=this.getTargetLocation(e.target.value,'all');
    this.setState({
      latitude:location.latitude,
      longitude:location.longitude,
      chooseCity: e.target.value,
      chooseArea:'all',
    })
  }
  onChangeArea = (e) => {
    const location=this.getTargetLocation(this.state.chooseCity,e.target.value);
    this.setState({
      latitude:location.latitude,
      longitude:location.longitude,
      chooseArea: e.target.value,
    })
  }
  getTargetLocation(chooseCity,chooseArea) {
    const {zipcode} = this.state;
    if (chooseCity == 'all' && chooseArea == 'all') {
      if (navigator.geolocation) {
        // HTML5 定位抓取
        navigator.geolocation.getCurrentPosition((position) => {
          return [position.coords.latitude,position.coords.longitude];
        },
          (error) => {
            switch (error.code) {
              case error.TIMEOUT:
                alert('TIMEOUT');
                break;
              case error.POSITION_UNAVAILABLE:
                alert('POSITION_UNAVAILABLE');
                break;
              case error.PERMISSION_DENIED: // 拒絕
                alert('PERMISSION_DENIED');
                break;
              case error.UNKNOWN_ERROR:
                alert('UNKNOWN_ERROR');
                break;
              default:
                break;
            }
          });
      }
    }
    else
    {
      let loc;
      if (chooseArea !== 'all') {
        loc = zipcode.filter(function (elem) {
          return elem.ZIPCODE == chooseArea;
        });
      }
      else {
        loc = zipcode.filter(function (elem) {
          return elem.COUNTYNAME == chooseCity;
        });
      }
      return {"latitude":loc[0].CENTERLATITUDE, "longitude":loc[0].CENTERLONGITUDE};
    }
  }
  chooseStation() {
    const { station, chooseCity, chooseArea } = this.state;
    if (chooseCity == 'all' && chooseArea == 'all') {
      return station;
    }
    else if (chooseArea == 'all') {
      return station.filter(function (elem) {
        return JSON.parse(elem.City).List[1].Value == chooseCity;
      });
    }
    else {
      return station.filter(function (elem) {
        return elem.ZipCode.substring(0, 3) == chooseArea;
      });
    }
  }
  render() {
    const { latitude, longitude, zipcode, chooseCity,chooseArea } = this.state;
    const chooseStation = this.chooseStation();
    return <div>
      <QueryComponent zipcode={zipcode} station={chooseStation} chooseCity={chooseCity} chooseArea={chooseArea} onChangeCity={this.onChangeCity} onChangeArea={this.onChangeArea} />
      <hr></hr>
      <MapComponent latitude={latitude} longitude={longitude} station={chooseStation} />
    </div>
  };
}

export default App;

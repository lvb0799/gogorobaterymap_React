import React, { PureComponent } from 'react';

class CitySelect extends PureComponent {
    render() {
        const { cityData ,onChangeCity} = this.props;
        return (
            <select id='city' name='city' onChange={onChangeCity}>
                <option value="all">全部</option>
            {
                cityData.map((elem, idx) => {
                    return <option key={elem.cityID}>{elem.cityName}</option>
                })
            }
            </select>
        );
    }
}

export default (CitySelect);
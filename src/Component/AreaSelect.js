import React, { PureComponent } from 'react';

class AreaSelect extends PureComponent {
    render() {
        const { zipcode,chooseArea,onChangeArea } = this.props;
        return (
            <select id='area' name='area' onChange={onChangeArea} value={chooseArea}>
                <option key='-1' value="all" >全部</option>
                {
                    zipcode.map((elem, idx) => {
                        return <option key={idx} value={elem.ZIPCODE} >{elem.TOWNNAME}</option>
                    })
                }
            </select>
        );
    }
}

export default (AreaSelect);
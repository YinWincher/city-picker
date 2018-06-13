import React from 'react';
import '../css/city-select.css';
import {getCity,getDistrict,getStreet,getProvince} from "../utils/getData";

const funcFromShow = {
    'province' : getProvince,
    'city' : getCity,
    'district' : getDistrict,
    'street' : getStreet
}
const getDateList = {
    'province' : 'province',
    'city' : 'province',
    'district' : 'city',
    'street' : 'district'
}
export default function City(props) {
    const {onHeaderClick,show,data,
        onDistrictChange,onStreetChange,
        onCityChange,onProvinceChange} = props;
    const {province,district,city,street} = data;
    const clickfuncFromShow = {
        'province' : onProvinceChange,
        'city' : onCityChange,
        'district' : onDistrictChange,
        'street' : onStreetChange
    }
    return (
        <div className='city-panel'>
            <div className="header"></div>
            <div className="select-panel">
                <ul className="panel-header" >
                    <li
                        className={show==='province'?'select':''}
                        onClick={onHeaderClick}
                        data-area="province">{province.text||'省份'}
                        </li>
                    <li
                        className={show==='city'?'select':''}
                        onClick={onHeaderClick}
                        data-area="city">{city.text||'城市'}</li>
                    <li
                        className={show==='district'?'select':''}
                        onClick={onHeaderClick} data-area="district">{district.text||'地区'}</li>
                    <li
                        className={show==='street'?'select':''}
                        onClick={onHeaderClick} data-area="street">{street.text||'街道'}</li>
                </ul>
                <ul className="panel-list">
                    {funcFromShow[show](data[getDateList[show]].id).map(val=>{
                        return (
                            <li
                                data-name={val.text}
                                data-areaid={val.id}
                                key={val.id}
                                onClick={clickfuncFromShow[show]}
                                className={val.text===data[show].text ?'select':''} >
                                {val.text}
                                </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
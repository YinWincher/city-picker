import React from 'react';
// import City from './City';
import CityPanel from './CityPanel'
import {isParentOfTarget} from "../utils/lib";

class CitySelect extends React.Component{
    constructor(){
        super();
        this.state = {
            data : {
                province:{
                },
                city:{
                },
                district:{
                },
                street: {}

            },
            val:'',
            show:'province',
            showPanel:false
        };
    }
    componentDidMount(){
        document.body.addEventListener('click',this.onClosePanel);
    }
    componentWillMount(){
        document.body.removeEventListener('click',this.onClosePanel);
    }
    onShowPanel = ()=>{
        this.setState({
            showPanel: true
        })
    }
    onHeaderClick= (event)=>{
        const {currentTarget} = event;
        console.log(currentTarget)
        this.setState({
            show:currentTarget.dataset['area']
        })
    }
    onProvinceChange = (event)=>{
        const {name:text,areaid:id} = event.currentTarget.dataset;
        const city = ["北京市","重庆市","上海市","天津市"];
        this.setState({
            data :{
                ...this.state.data,
                province:{
                    text,
                    id,
                },
                city:{},
                district:{},
                street:{}
            },
            show:"city"
        });
        if(city.includes(text)){
            this.setState({
                city:{
                    text,
                    id
                },
                // show:"district"
            })
        }
    }

    onCityChange = (event)=>{
        const {name:text,areaid:id} = event.currentTarget.dataset;
        this.setState({
            data:{
                ...this.state.data,
                city:{
                    text,
                    id
                },
                district:{},
                street:{}
            },
            show : "district"
        });
    }
    onDistrictChange = (event)=>{
        const {name:text,areaid:id} = event.currentTarget.dataset;
        this.setState({
            data : {
                ...this.state.data,
                district:{
                    text,
                    id
                },
                street:{},
            },
            show:"street"
        })
    }
    onStreetChange = (event)=>{
        const {onChange} = this.props;
        const {name:text,areaid:id} = event.currentTarget.dataset;
        const {province,city,district} = this.state.data;
        const val = ''+province.text+city.text+district.text+text;
        const street = {
            text,
            id
        }
        this.setState({
            data : {
                ...this.state.data,
                street
            },
            val,
            showPanel:false
        })
        if(onChange){
            onChange(province,city,district,street);
        }
    }

    onClosePanel = (event)=>{
        if(isParentOfTarget('div.select-panel',event.target)){
            return ;
        }
        if(this.state.showPanel){
            this.setState({
                showPanel : false
            });
        }

    }
    render(){
        const {show,data,showPanel,val} = this.state;
        return (
            <div className="wrapper" >
                <div className='top' onClick={this.onShowPanel}>
                    {/*<span className={'dis'}>所在地区</span>*/}
                    <span className={'input-button'}>{val||'所在地区'}</span>
                    {/*<span className={'icon'}> > </span>*/}
                </div>
                {showPanel ?
                    <CityPanel
                        data={data}
                        onStreetChange={this.onStreetChange}
                        onHeaderClick={this.onHeaderClick}
                        show={show}
                        onProvinceChange={this.onProvinceChange}
                        onCityChange={this.onCityChange}
                        onDistrictChange={this.onDistrictChange}
                    />
                    : ''
                }

            </div>
        );
    }
}

export default CitySelect;
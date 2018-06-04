import data from '../mockDate/areas';
const citys = data.city;
const districts = data.district;
const streets = data.street;
const provinces = data.province;
const zhiXiaShi = ['110000','120000','310000','500000'];
const zhiXiaShiHash = {
    '110000':{
        id:'110000',
        text:'北京市'
    },
    '120000':{
        id:'120000',
        text:'天津市'
    },
    '310000':{
        id:'310000',
        text:'上海市'
    },
    '500000':{
        id:'500000',
        text:'重庆市'
    },
}
export const getCity = (id)=>{
    // debugger;
    if(typeof id !=='string'){
        return [];
    }
    if(zhiXiaShi.includes(id)){
        return [zhiXiaShiHash[id]];
    }
    const ID = id.slice(0,2);
    const reg = new RegExp('^'+ID);
    return citys.filter(val=>{
        return val.id.match(reg);
    })
}
export const getDistrict = (id)=>{
    // debugger;
    if(typeof id !=='string'){
        return [];
    }
    if(zhiXiaShi.includes(id)){
        id = id.slice(0,3);
        const reg1 = new RegExp('^'+id+'1');
        const reg2 = new RegExp('^'+id+'2');
        let results = [];
        let tem1 = districts.filter(val=>{
            return val.id.match(reg1);
        })
        let tem2 = districts.filter(val=>{
            return val.id.match(reg2);
        })
        return [...tem1,...tem2];
    }
    const ID = id.slice(0,4);
    const reg = new RegExp('^'+ID);
    const end = new RegExp('01$');
    return districts.filter(val=>{
        return val.id.match(reg)&& !val.id.match(end);
    })
}
export const getStreet = (id)=>{
    // debugger;
    if(typeof id !=='string'){
        return [];
    }
    const ID = id.slice(0,6);
    const reg = new RegExp('^'+ID);
    return streets.filter(val=>{
        return val.id.match(reg);
    })
}
export const getProvince = (id)=>{
    return provinces;
}

import React, { Component } from 'react';
import './App.css';
import CitySelector from './component/CitySelect';
class App extends Component {
  render() {
    return (
      <div className="App">
          <CitySelector
              onChange={onChange}
          />
      </div>
    );
  }
}
function onChange(province,city,dis,str){
    console.log(province.text,city.text,dis.text,str.text);
}
export default App;

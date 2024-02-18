import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";

function App() {
  const [result , setresult] = useState({});
  const [city , setcity] = useState()
  const handleSearch = () =>{
    fetch(`${AppInfo.url}?q=${city}&appid=${AppInfo.keys}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setresult(data)
    })

  }
  const AppInfo = {
    keys:"1d7d012881cd8ccf1947aaa2e1e30d5a",
    url:"https://api.openweathermap.org/data/2.5/weather"
  }
  useEffect(() => {
    fetch(`${AppInfo.url}?q=karachi&appid=${AppInfo.keys}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setresult(data)
    })

  },[])
  return (
    <div className='App'>
      <h1>Weather App</h1>
      <div className='App'><input type="text" name="city" onChange={(e) => setcity(e.target.value)}/>
      <button type="button" onClick={handleSearch}>Search</button></div>
      {<h1> {result.main && result.main.temp}<sup>'</sup>F</h1> }
      <h1>{result.main && result.main.humidity}<sup>'</sup>F</h1> 
       <h1>{result.weather[0].description}</h1> 
     
     

    </div>
  );
}

export default App;

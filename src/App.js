
import './App.css';
import Forcast from './components/forcast/Forcast';
import Search from './components/search/Search';
import {base} from "././key/apiKey";
import {key} from "././key/apiKey"
import axios from 'axios'
import React,{useState,useEffect} from 'react';
function App() {
  const [weather,setWeather]=useState("");
  const [error,setError]=useState("");
  //const [city,setCity]=useState("Delhi");
  const search=async(city)=>{
    try{
     
    const {data}=await axios.get(
            `${base}weather?q=${city}&units=metric&APPID=${key}`
          )
         //console.log(data,"Problem")
       
          setWeather(data);
          // setQuery("");

    }
    catch(e){
      console.log("Err-Problem")
      console.log(error);
        setWeather("");
        // setQuery("");
        setError({ message: "Please Enter Correct Location", query: city });
    }
  }

 useEffect(()=>{
    search("Delhi");
 },[]);



  return (
    <div className='body'>

   
    <div className="App">
      <Search search={search} weather={weather} error={error}/>
      <Forcast/>
    </div>

    </div>
  );
}

export default App;

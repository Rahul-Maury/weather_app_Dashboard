import React,{useState,useEffect} from 'react'
import './forcast.css'
import axios  from 'axios';
import {base} from "../../key/apiKey";
import {key} from "../../key/apiKey";
import Clock from "react-live-clock";
import loader from "../../images/WeatherIcons.gif";

const Initial_state = {

    
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC:undefined,
    temperatureF:undefined,
    city: undefined,
    country:undefined,
    humidity:undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise:undefined,
    sunset: undefined,
    errorMsg: undefined,
    main:"Check"
  };
const Forcast = () => {
    const [state,setState]=useState(Initial_state);

    const  getPosition = (options) => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };
      async function  getWeather(lat,lon){
            
        const {data}=await axios.get( `${base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`);
        console.log(data,"ye wala data");
       setState(
         {
              lat: lat,
              lon: lon,
              city: data.name,
              temperatureC: Math.round(data.main.temp),
              temperatureF: Math.round(data.main.temp * 1.8 + 32),
              humidity: data.main.humidity,
              main: data.weather[0].main,
              country: data.sys.country,
             sunrise:data.sys.sunrise,
             sunset: data.sys.sunset,
             

         }
       )
     // setState(data);

   }

   const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`;
  };
    
   useEffect(()=>{
    const data=getPosition();
    data.then((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude);

    })
    .catch((err) => {
      //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
      this.getWeather(28.67, 77.22);
      alert(
        "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
      );
    });

    
   
 },[]
);

  return (
    <>
    {state.temperatureC?<>
       <div className='forcast__box'>
        
        <div className='box-1'>
          <div className='today_temp'>
              <div className='location'>
              {state.city},
             <span>{state.country}</span>
              </div>
               <div className='tempreature'>
               
                    {Math.round(state.temperatureC)}°<span>C</span>
              
              <span className="slash">/
               {state.temperatureF} &deg;F
               </span>
               </div>
               
                
          </div>
          <div className='time'> 
        
                  
                  <div className="current-time">
                    <Clock format="HH:mm:ss" interval={1000} ticking={true} className='Clock' />
                  </div>
                  <div className="current-date">{dateBuilder(new Date())}</div>
               
                
          </div>
   
        </div>
        <div className='box-2'>
  
        </div>
          
      </div>

    </>
   : (
      <>
      <img
       src={loader}
       style={{ width: "50%", WebkitUserDrag: "none" }}
       alt="Icon"
     />
     <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
       Detecting your location
     </h3>
     <h3 style={{ color: "white", marginTop: "10px" }}>
       Your current location wil be displayed on the App <br></br> & used
       for calculating Real time weather.
     </h3>
      </>

   )
    
   }
   </>
  )
   
}

export default Forcast
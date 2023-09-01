import React ,{useState}from 'react'
import './search.css'
const Search = (props) => {
    const {search,weather,error}=props;
    //console.log("fun",search,weather);
    console.log(weather);
    const [query,setQuery]=useState("");
   
 return (
   <>
   <div  className='search__contaier'>
   <div className='search__box'>
   <h2 className='search_heading'>Weather</h2>
   
    <input type='search'
           placeholder='Search Any City'
           className='search'
            onChange={(e)=>{setQuery(e.target.value)}}
            value={query}
    >

      </input>
    
    <button className='btn' onClick={()=>search(query)}>Find</button>
    <div className='search_result'>
        
        <ul  className='list'>
        {typeof weather.main != "undefined" ? (
      
      <div>
        {" "}
        <li className="cityHead">
          <p>
            {weather.name}, {weather.sys.country}
          </p>
          <img
            className="temp icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Icon"
          />
        </li>
        <li>
          Temperature{" "}
          <span className="temp">
            {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
          </span>
        </li>
        <li>
          Humidity{" "}
          <span className="temp">
            {Math.round(weather.main.humidity)}%
          </span>
        </li>
        <li>
          Visibility{" "}
          <span className="temp">
            {Math.round(weather.visibility)} mi
          </span>
        </li>
        <li>
          Wind Speed{" "}
          <span className="temp">
            {Math.round(weather.wind.speed)} Km/h
          </span>
        </li>
        
      </div>
        ) : (
        <li>
        {error.query} {error.message}
        <h5>Search Location</h5>
      </li>
    )} 
    
  </ul>
      
    </div>
   </div>
   </div>
    </>
  )
}

export default Search
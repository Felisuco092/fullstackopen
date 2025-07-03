import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY

const Weather = ({country, weather}) => {
  console.log("weather", weather);
  if (!weather) {
    return <p>Loading weather...</p>
  }
  
  return (
    <>
      <h2>Weather in {weather.location.name}</h2>
      <p>Temperature {weather.current.temp_c} Celsius</p>
      <img src={`https:${weather.current.condition.icon}`}/>
      <p>Wind {weather.current.wind_mph} mph</p>
    </>
  )
}

const Country = ({country, weather}) => {

  
  
  return (
    <>
        <h1>{country.name.common}</h1>
        Capital {country.capital} <br/>
        Area {country.area}
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png}/>
        <Weather country={country} weather={weather}/>
      </>
  )
}

const Display = ({show, index, setIndex, weather, setCountryWeather}) => {
  const handleClick = (name) => {
    return () => {
      //console.log("index", show.findIndex((country) => country.name.common === name));
      
      setIndex(show.findIndex((country) => country.name.common === name))
    }
  }

  useEffect(() => {
    console.log("show", show);
  if (show.length === 1) {
    setCountryWeather(show[0].name.common)
  } else if (show.length > 1 && show.length <= 10 && (index || index === 0)) {
    setCountryWeather(show[index].name.common)
  }
}, [show, index, setCountryWeather])

  if(show.length >= 10) {
    return <p>Too many matches, specify another file</p>
  } else if(show.length > 1 && show.length <= 10) {
    if(!index && index !== 0) {
      return show.map((country) =>  {
        return (
          <div key={country.name.common}>
            {country.name.common} 
            <button onClick={handleClick(country.name.common)}>Show</button><br/>
          </div>
        )
      })
    } else {
      return <Country country={show[index]} weather={weather} />
    }
  } else if(show.length == 1) {
    return (
      <Country country={show[0]} weather={weather}/>
    )
  } else {
    return null
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [index, setIndex] = useState(null)
  const [countryWeather, setCountryWeather] = useState(null)
  const [weather, setWeather] = useState(null)
  useEffect(()=> {
    if(countryWeather) {
      axios
        .get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${countryWeather}&days=1&aqi=no&alerts=yes`)
        .then((response) => {
          console.log("weather response", response.data);
          setWeather(response.data)
        })
    }
  },[countryWeather])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setIndex(null)
  }

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
  },[])

  const show = countries.filter((country) => {
    if(search === '') return false
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })

  
  
  

  return (
    <>
      <form>
        find countries <input value={search} onChange={handleSearch}/>
      </form>
      <Display show={show} index={index} setIndex={setIndex} weather={weather} setCountryWeather={setCountryWeather}/>
    </>
  )
}

export default App

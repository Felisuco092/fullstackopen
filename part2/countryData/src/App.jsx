import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  
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
      </>
  )
}

const Display = ({show, index, setIndex}) => {
  const handleClick = (name) => {
    return () => {
      //console.log("index", show.findIndex((country) => country.name.common === name));
      
      return setIndex(show.findIndex((country) => country.name.common === name))
    }
  }

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
      return <Country country={show[index]} />
    }
  } else if(show.length == 1) {
    return (
      <Country country={show[0]}/>
    )
  } else {
    return null
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [index, setIndex] = useState(null)

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
      <Display show={show} index={index} setIndex={setIndex}/>
    </>
  )
}

export default App

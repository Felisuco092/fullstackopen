import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({show}) => {
  if(show.length >= 10) {
    return <p>Too many matches, specify another file</p>
  } else if(show.length > 1 && show.length <= 10) {
    return show.map((country) => <>{country.name.common}<br/></>)
  } else if(show.length == 1) {
    return (
      <>
        <h1>{show[0].name.common}</h1>
        Capital {show[0].capital} <br/>
        Area {show[0].area}
        <h2>Languages</h2>
        <ul>
          {Object.values(show[0].languages).map((language) => <li>{language}</li>)}
        </ul>
        <img src={show[0].flags.png}/>
      </>
    )
  } else {
    return null
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
  },[])

  const show = countries.filter((country) => {
    if(search === '') return false
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })
  console.log(show);
  
  
  

  return (
    <>
      <form>
        find countries <input value={search} onChange={handleSearch}/>
      </form>
      <Display show={show}/>
    </>
  )
}

export default App

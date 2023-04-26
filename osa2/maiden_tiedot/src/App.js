import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Countries = ({ countries, handleToShow }) => {
  console.log('Countries', countries)
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>)
  } else if (countries.length === 1) {
    const country = countries[0]
    const languagesList = Object.values(country.languages)
    console.log('kielet', languagesList)
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>
          {languagesList.map(l => <Language key={l} language={l} />)}
        </ul>
        <img src={country.flags.png} alt="" width="400" />
      </div>
    )
  } else {
    return (
      countries.map(c => <Country key={c.name.common} countryName={c.name.common} handleToShow={handleToShow} />)
    )
  }
}

const Country = ({ countryName, handleToShow }) => {
  return (
    <div>
      {countryName} <button value={countryName} onClick={handleToShow}>show</button>
    </div>
  )
}

const Language = ({ language }) => {
  return (
    <div>
      <li>
        {language}
      </li>
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([])
  const [chars, setChars] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setData(response.data)
        // console.log(response.data[0].name.common) //['name']['common'])
      })
  }, [])

  const handleToShow = (event) => {
    console.log('handle to show: ', event.target.value)
    setChars(event.target.value)
  }

  let countriesToShow = data.filter(c => c.name.common.toLowerCase().includes(chars.toLowerCase()))

  const country = countriesToShow.filter(c => c.name.common.toLowerCase() === chars.toLowerCase())
  console.log('one country', country)

  if (country.length === 1) {
    countriesToShow = country
  }

  return (
    <div>
      <form >
        find countries: <input value={chars} onChange={handleToShow} />
      </form>
      <Countries countries={countriesToShow} handleToShow={handleToShow} />
    </div>
  )
}

export default App;

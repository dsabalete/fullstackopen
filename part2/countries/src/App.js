import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [result, setResult] = useState({})
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
            setCountries(response.data)
        })
    }, [])

    const handleChange = (e) => {
        const text = e.target.value
        setSearch(text)
        const result = countries.filter((country) =>
            country.name.toLowerCase().includes(text.toLowerCase())
        )
        setResult(result)
    }

    const renderCountry = (country) => (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <div>
                <h3>languages</h3>
                <ul>
                    {country.languages.map((lang) => (
                        <li>{lang.name}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flag} width='200' alt={`${country.name} flag`} />
        </div>
    )

    return (
        <div>
            <div>
                Find countries <input onChange={handleChange} />
            </div>
            <div>
                {search && result.length > 10
                    ? 'Too many matches, specify another filter'
                    : ''}
            </div>
            <div>
                {search &&
                    result.length <= 10 &&
                    result.length > 1 &&
                    result.map((country) => (
                        <div key={country.name}>{country.name}</div>
                    ))}
            </div>
            <div>
                {search && result.length === 1 && renderCountry(result[0])}
            </div>
        </div>
    )
}

export default App

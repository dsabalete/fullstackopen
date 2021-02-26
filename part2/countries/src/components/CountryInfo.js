import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <div>
                <h3>languages</h3>
                <ul>
                    {country.languages.map((lang) => (
                        <li key={lang['iso639_1']}>{lang.name}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flag} width='200' alt={`${country.name} flag`} />
            <Weather city={country.capital} />
        </div>
    )
}

export default CountryInfo

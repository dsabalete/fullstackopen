import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const [imgSrc, setImgSrc] = useState('')
    const [windInfo, setWindInfo] = useState('')
    const [tempInfo, setTempInfo] = useState('')

    useEffect(() => {
        const key = process.env.REACT_APP_API_KEY
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${key}&query=${city}`
            )
            .then((response) => {
                const {
                    temperature,
                    weather_icons,
                    wind_speed,
                    wind_dir
                } = response.data.current
                setTempInfo(`${temperature} ºC`)
                setImgSrc(weather_icons[0])
                setWindInfo(`${wind_speed} Km/h direction ${wind_dir}`)
            })
    }, [])

    return (
        <div>
            <h3>Weather in {city}</h3>
            <div>
                <strong>temperature:</strong> {tempInfo}
            </div>
            <img src={imgSrc} alt='Current weather icon' />
            <div>
                <strong>wind:</strong> {windInfo}
            </div>
        </div>
    )
}

export default Weather

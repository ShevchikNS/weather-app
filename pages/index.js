import React, {useState, useEffect} from 'react';
import Header from './Header'
import Image from 'next/image'
import Head from 'next/head';
import Footer from './Footer'
import {checkWeatherWithCode, getWindSpeed, getSunTime} from './services/checkWeather.js'

export async function getServerSideProps() {
    const resDegrees = await fetch(`${process.env.PORT}/api/weatherApi`)
    const weatherFromApi = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=53.63&longitude=23.89&daily=sunrise,sunset&current_weather=true&windspeed_unit=ms&timezone=Europe%2FMoscow`)

    const weather = await resDegrees.json()
    const weather2 = await weatherFromApi.json()

    const weatherCode = weather2.current_weather.weathercode

    return {props: {weather, weather2}}
}

export default function Home({weather, weather2}) {
    const [currentWeather, setCurrentWeather] = useState('')
    const Style = {
        transform: `rotate(${getSunTime(weather2)}deg)`,
    }

    const sunrise = (weather2.daily.sunrise[0])
    const sunriseWithoutData = sunrise.slice(sunrise.length - 5)
    const parsedSunrise = sunriseWithoutData.split(':')
    const convertedSunrise = Number(parsedSunrise)

    useEffect(() => {
        const resultWeatherCheck = checkWeatherWithCode(weather2.current_weather.weathercode)
        setCurrentWeather(resultWeatherCheck)
    });
    return (

        <div>
            <Head>
                <title>Погода Гродно</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="keywords" content="Погода, Гродно, Погода Азот, Погода Гродно"/>
            </Head>
            <div className="content">
                <Header/>
                <div className="now">
                    <div className="now-astro">
                        <div className="now-astro-sun">
                            <div className="now-astro-line now-astro-line-day" style={Style}></div>
                        </div>
                        <div className="sunriseSunset">
                            <div className="now-astro-sunrise">
                                <div className="time">
                                    {(weather2.daily.sunrise[0]).slice((weather2.daily.sunrise[0]).length - 5)}
                                </div>
                                <div className="caption">
                                    {convertedSunrise > 10 ? <p>Заход</p> : <p>Восход</p>}
                                </div>
                            </div>
                            <div className="now-astro-sunset">
                                <div className="time">
                                    {(weather2.daily.sunset[0]).slice((weather2.daily.sunset[0]).length - 5)}
                                </div>
                                <div className="caption">
                                    {convertedSunrise > 10 ? <p>Восход</p> : <p>Заход</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainData">
                    <div className="degrees"> {weather.degrees}°C</div>
                    <div className="weatherNow"> {currentWeather}</div>
                </div>
            </div>
            <Footer
                pressure={weather.pressure}
                windSpeed={weather.windSpeed}
                windDirection={getWindSpeed(weather.windDirection)}
            />
        </div>
    )
}


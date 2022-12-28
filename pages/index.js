import React, {useState} from 'react';
import Header from './Header'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Footer from './Footer'

export async function getServerSideProps() {
    const resDegrees = await fetch(`${process.env.PORT}/api/hello`)
    const weatherFromApi = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=53.63&longitude=23.89&daily=sunrise,sunset&current_weather=true&windspeed_unit=ms&timezone=Europe%2FMoscow`)

    const weather = await resDegrees.json()
    const weather2 = await weatherFromApi.json()

    const weatherCode = weather2.current_weather.weathercode


    return {props: {weather, weather2}}
}
export const getSunTime = (weather2) => {
    const date = new Date()
    const currentHours = date.getHours()
    const currentMinutes = date.getMinutes()
    const sunrise = (weather2.daily.sunrise[0])
    const sunriseWithoutData = sunrise.slice(sunrise.length - 5)
    const sunset = weather2.daily.sunset[0]
    const sunsetWithoutData = sunset.slice(sunset.length - 5)

    const parsedSunrise = sunriseWithoutData.split(':')
    const parsedSunset = sunsetWithoutData.split(':')
    const dayLengh = (parsedSunset[0] - parsedSunrise[0]) + 1/60 * (parsedSunset[1] - parsedSunrise[1])
    const dayCoefficient = ((currentHours - parsedSunrise[0]) + 0.01 * (currentMinutes - parsedSunrise[1]))
    const sunTime = -40 + dayCoefficient * (80 / dayLengh)

    return sunTime
}

export default function Home({weather, weather2}) {
    const getWindSpeed = (d) => {
        console.log(d)
        d = Number(d)
        let directions = ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'];

        d += 22.5;

        if (d < 0)
            d = 360 - Math.abs(d) % 360;
        else
            d = d % 360;

        let w = parseInt(d / 45);
        return `${directions[w]}`;
    }
    const Style = {
        transform: `rotate(${getSunTime(weather2)}deg)`,
    }
    const sunrise = (weather2.daily.sunrise[0])
    const sunriseWithoutData = sunrise.slice(sunrise.length - 5)
    const parsedSunrise = sunriseWithoutData.split(':')
    const convertedSunrise = Number(parsedSunrise)

    return (

        <div>
            <Head>
                <title>Погода Гродно</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="keywords" content="Погода, Гродно, Погода Азот, Погода Гродно" />
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
                                    {convertedSunrise > 10 ? <p>Заход</p>: <p>Восход</p>}
                                </div>
                            </div>
                            <div className="now-astro-sunset">
                                <div className="time">
                                    {(weather2.daily.sunset[0]).slice((weather2.daily.sunset[0]).length - 5)}
                                </div>
                                <div className="caption">
                                    {convertedSunrise > 10 ? <p>Восход</p>: <p>Заход</p> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainData">
                    <div className="degrees"> {weather.degrees}°C</div>
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


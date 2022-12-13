import React, {useState} from 'react';
import Header from './Header'
import Footer from './Footer'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Head from 'next/head';

export async function getServerSideProps() {
    const resDegrees = await fetch(`${process.env.PORT}/api/hello`)
//
    const weather = await resDegrees.json()
//     const sunriseSunset = await resSunriseSunset.json()
    return {props: {weather}}
}

export const getSunTime = (weather) => {
    const date = new Date()
    const currentHours = date.getHours()
    const currentMinutes = date.getMinutes()
    const parsedSunrise = (weather.sunrise).split(':')
    const parsedSunset = (weather.sunset).split(':')
    const dayLengh = (parsedSunset[0] - parsedSunrise[0]) + 0.01 * (parsedSunset[1] - parsedSunrise[1])
    const dayCoefficient = ((currentHours - parsedSunrise[0]) + 0.01 * (currentMinutes - parsedSunrise[1]))
    const sunTime = -40 + dayCoefficient * (100 / dayLengh)

    return sunTime
}
export default function Home({weather}) {
    const Style = {
        transform: `rotate(${getSunTime(weather)}deg)`,
    }

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
                                    {weather.sunrise}
                                </div>
                                <div className="caption">
                                    Восход
                                </div>
                            </div>
                            <div className="now-astro-sunset">
                                <div className="time">
                                    {weather.sunset}
                                </div>
                                <div className="caption">
                                    Заход
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainData">
                    <h1 className="degrees"> {weather.degrees}°C</h1>
                    <h1 className="weatherNow"> {weather.weatherNow}</h1>
                </div>
            </div>
            <Footer
                pressure={weather.pressure}
                windSpeed={weather.windSpeed}
                windDirection={weather.windDirection}
            />
        </div>
    )
}


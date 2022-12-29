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

export const getSunTime = (weather) => {
    const date = new Date()
    const currentHours = date.getHours()
    const currentMinutes = date.getMinutes()
    const sunrise = (weather.daily.sunrise[0])
    const sunriseWithoutData = sunrise.slice(sunrise.length - 5)
    const sunset = weather.daily.sunset[0]
    const sunsetWithoutData = sunset.slice(sunset.length - 5)

    const parsedSunrise = sunriseWithoutData.split(':')
    const parsedSunset = sunsetWithoutData.split(':')
    const dayLengh = (parsedSunset[0] - parsedSunrise[0]) + 1 / 60 * (parsedSunset[1] - parsedSunrise[1])
    const dayCoefficient = ((currentHours - parsedSunrise[0]) + 0.01 * (currentMinutes - parsedSunrise[1]))
    const sunTime = -40 + dayCoefficient * (80 / dayLengh)

    return sunTime
}
const getWindSpeed = (d) => {
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

const checkWeatherWithCode = (weatherCode) => {
    const weatherValues = {
        weatherCode_0: 'Ясно',
        weatherCode_1: 'В основном ясно',
        weatherCode_2: 'Переменная облачность',
        weatherCode_3: 'Пасмурно',
        weatherCode_45: 'Туман',
        weatherCode_48: 'Туман',
        weatherCode_51: 'Слабая изморось',
        weatherCode_53: 'Умеернная изморось',
        weatherCode_55: 'Изморозь',
        weatherCode_61: 'Небольшой дождь',
        weatherCode_63: 'Умеренный дождь',
        weatherCode_65: 'Сильный дождь',
        weatherCode_66: 'Дождь',
        weatherCode_67: 'Сильный Дождь',
        weatherCode_71: 'Небольшой снег',
        weatherCode_73: 'Снег',
        weatherCode_75: 'Снегопад',
        weatherCode_77: 'Град',
        weatherCode_80:'Слабый ливень',
        weatherCode_81: 'Ливень',
        weatherCode_82: 'Ливневые дожди',
        weatherCode_85: 'Снегопад',
        weatherCode_86: 'Сильный снегопад',
        weatherCode_95: 'Гроза',
        weatherCode_96: 'Гроза с градом',
        weatherCode_99: 'Гроза с сильным градом'
    }
    switch (weatherCode) {
        case 0: return weatherValues.weatherCode_0
        case 1: return weatherValues.weatherCode_1
        case 2: return weatherValues.weatherCode_3
        case 3: return weatherValues.weatherCode_3
        case 45: return weatherValues.weatherCode_45
        case 48: return weatherValues.weatherCode_48
        case 51: return weatherValues.weatherCode_51
        case 53: return weatherValues.weatherCode_53
        case 55: return weatherValues.weatherCode_55
        case 56: return weatherValues.weatherCode_56
        case 57: return weatherValues.weatherCode_57
        case 61: return weatherValues.weatherCode_61
        case 63: return weatherValues.weatherCode_63
        case 65: return weatherValues.weatherCode_65
        case 66: return weatherValues.weatherCode_66
        case 67: return weatherValues.weatherCode_67
        case 71: return weatherValues.weatherCode_71
        case 73: return weatherValues.weatherCode_73
        case 75: return weatherValues.weatherCode_75
        case 77: return weatherValues.weatherCode_77
        case 80: return weatherValues.weatherCode_80
        case 81: return weatherValues.weatherCode_81
        case 82: return weatherValues.weatherCode_82
        case 85: return weatherValues.weatherCode_85
        case 86: return weatherValues.weatherCode_86
        case 95: return weatherValues.weatherCode_95
        case 96: return weatherValues.weatherCode_96
        case 99: return weatherValues.weatherCode_99
    }
}

export default function Home({weather, weather2}) {
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
                    <div className="weatherNow"> {checkWeatherWithCode(weather2.current_weather.weathercode)}</div>
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


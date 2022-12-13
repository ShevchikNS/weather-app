import React, { useState } from 'react';
import Header from './Header'
import Footer from './Footer'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Head from 'next/head';

export async function getServerSideProps() {
    const resDegrees= await fetch(`${process.env.PORT}/api/hello`)
//     // const resSunriseSunset = await fetch(`http://localhost:3000/api/SunriseSunset`)
//
    const azot = await resDegrees.json()
//     const sunriseSunset = await resSunriseSunset.json()
    return { props: { azot } }
}
// export const getSunTime = (sunriseSunset) => {
//     const date = new Date()
//     const currentHours = date.getHours()
//     const currentMinutes = date.getMinutes()
//     const parsedSunrise = (sunriseSunset.sunrise).split(':')
//     const parsedSunset = (sunriseSunset.sunset).split(':')
//     const dayLengh = (parsedSunset[0] - parsedSunrise[0]) + 0.01 * (parsedSunset[1] - parsedSunrise[1])
//     const dayCoefficient = ((currentHours - parsedSunrise[0])  + 0.01 * (currentMinutes - parsedSunrise[1]))
//     const sunTime = -40 + dayCoefficient * (100 / dayLengh)
//
//     return sunTime
// }
export default function Home({azot}) {
//     const Style = {
//         transform: `rotate(${getSunTime(sunriseSunset)}deg)`,
//     }

    return (

        <div>
            <div className="content">
                <Header/>
                <div className="now">
                        <div className="now-astro">
                            <div className="now-astro-sun">
                                <div className="now-astro-line now-astro-line-day"></div>
                            </div>
                            <div className="sunriseSunset">
                                <div className="now-astro-sunrise">
                                    <div className="time">
                                        {/*{sunriseSunset.sunrise}*/}
                                    </div>
                                    <div className="caption">
                                        Восход
                                    </div>
                                </div>
                                <div className="now-astro-sunset">
                                    <div className="time">
                                        {/*{sunriseSunset.sunset}*/}
                                    </div>
                                    <div className="caption">
                                        Заход
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="mainData">
                    <h1 className="degrees"> {azot.degrees}</h1>
                    <h1 className = "weatherNow"></h1>
                </div>
                {/*<h2>Осадки: {currentPrecipitation[date.getHours()]}</h2>*/}
            </div>

        </div>

    )
}


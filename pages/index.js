import React, {useState} from 'react';
import Header from './Header'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Head from 'next/head';

export async function getServerSideProps() {
    const resDegrees = await fetch(`${process.env.PORT}/api/hello`)
    const weather = await resDegrees.json()
    return {props: {weather}}
}


export default function Home({weather}) {

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
                            <div className="now-astro-line now-astro-line-day" ></div>
                        </div>
                        <div className="sunriseSunset">
                            <div className="now-astro-sunrise">
                                <div className="time">
                                    Пока ничего
                                </div>
                                <div className="caption">

                                </div>
                            </div>
                            <div className="now-astro-sunset">
                                <div className="time">
                                    Пока ничего
                                </div>
                                <div className="caption">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainData">
                    <div className="degrees"> {weather.degrees}°C</div>
                </div>
            </div>
        </div>
    )
}


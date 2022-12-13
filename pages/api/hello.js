const axios = require('axios')
const cheerio = require('cheerio')

export default async function handler(req, res) {
    const response = await axios.get('http://old.azot.by/meteo/')
    const response2 = await axios.get('https://www.gismeteo.by/weather-grodno-4243/now/')

    const html = response.data
    const html2 = response2.data

    const $ = cheerio.load(html)
    const $2 = cheerio.load(html2)

    const values = []
    const values2 = []
    $('tbody').each((index, el) => {
        const page = $(el)
        const title = page.find('td').text()
        values.push(title)
    })
    $2('div .now-astro').each((index, el) => {
        const page = $(el)
        const sunrise = page.find('div .now-astro-sunrise .time').text()
        const sunset = page.find('div .now-astro-sunset .time').text()
        values2.push(sunrise)
        values2.push(sunset)
    })
    $2('div .now').each((index, el) => {
        const page = $(el)
        const weatherNow = (page.find('div .now-desc').text())
        values2.push(weatherNow)
    })
    $2('div .unit_wind_m_s').each((index, el) => {
        const page = $(el)
        const windDirection = (page.find('div .item-measure').text())
        values2.push(windDirection.slice(3))
    })

    const degrees = (values[0].split(':')[1].split(' ')[0]).slice(2)
    const pressure = (values[0].split('\n')[3]).trim().split(' ')[0]
    const windSpeed = values[0].split('\n')[6].split(' ')[0]
    const sunrise = values2[0]
    const sunset = values2[1]
    const weatherNow = values2[2]
    const windDirection = values2[3]

    res.status(200).json({
        degrees: degrees,
        pressure: pressure,
        windSpeed: windSpeed,
        sunrise: sunrise,
        sunset: sunset,
        weatherNow: weatherNow,
        windDirection: windDirection
    })
    res.end()
}




const axios = require('axios')
const cheerio = require('cheerio')

export default async function handler(req, res) {
    const response = await axios.get('http://old.azot.by/meteo/')

    const html = response.data

    const $ = cheerio.load(html)

    const values = []
    $('tbody').each((index, el) => {
        const page = $(el)
        const title = page.find('td').text()
        values.push(title)
    })

    const degrees = (values[0].split(':')[1].split(' ')[0]).slice(2)
    const pressure = (values[0].split('\n')[3]).trim().split(' ')[0]
    const windSpeed = values[0].split('\n')[6].split(' ')[0]
    const windDirection = (values[0].split('\n')[9]).replace(/[^0-9]/g,"")

    res.status(200).json({
        degrees: degrees,
        pressure: pressure,
        windSpeed: windSpeed,
        windDirection: windDirection
    })
    res.end()
}




const axios = require('axios')
const cheerio = require('cheerio')

export default async function handler(req, res) {
    const response = await axios.get('http://old.azot.by/meteo/')
    const html = response.data
    const $ = cheerio.load(html)
    const values = []


    // values.push($('b').html())
    $('tbody').each((index, el) => {
        const game = $(el)
        const title = game.find('td').text()
        values.push(title)
    })
    const degrees = values[0].split('-')[1].split(' ')[0]
    console.log(degrees)
    res.status(200).json({degrees: degrees})
    res.end()
}




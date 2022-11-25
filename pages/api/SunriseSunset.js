
const puppeteer = require('puppeteer')

export default async function handler(req, res) {

    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    await page.goto('https://www.gismeteo.by/weather-grodno-4243/now/')
    let element1 = await page.waitForSelector(".now-astro-sunrise > .time")
    let element2 = await page.waitForSelector(".now-astro-sunset > .time")
    let element3 = await page.waitForSelector(".now-desc")

    let text1 = await page.evaluate(element => element.textContent, element1)
    let text2 = await page.evaluate(element => element.textContent, element2)
    let text3 = await page.evaluate(element => element.textContent, element3)

    browser.close()
    res.status(200).json({ sunrise: text1, sunset: text2, weatherNow: text3})
    res.end()
}

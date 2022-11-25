
const puppeteer = require('puppeteer')

export default async function handler(req, res) {
  const browser = await puppeteer.launch({})
  const page = await browser.newPage()
  await page.goto('http://old.azot.by/meteo/')
  const result = await page.evaluate(() => {
    const rows = document.querySelectorAll('#dewrap tr');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    });
  });

  const degrees = (result[1].toString()).split(' ')[0];
  const pressure = (result[2].toString().split(' ')[0])
  const windSpeed = (result[3].toString().split(' ')[0])
  const windDirection = (result[4].toString().split('\n')[0])
  browser.close()
  res.status(200).json({ degrees: degrees, pressure: pressure, windSpeed: windSpeed, windDirection: windDirection })
  res.end()
}

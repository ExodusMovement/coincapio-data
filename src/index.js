import got from 'got'

import symbols from './symbols.json'
const intervals = [1, 7, 30, 90, 180, 365]

export async function history (coinName, interval) {
  let symbol = symbols[coinName.toLowerCase()] || coinName
  let timeframe = intervals.indexOf(interval) > -1 ? (interval + 'day/') : ''
  let url = 'http://www.coincap.io/history/' + timeframe + symbol

  let response = await got(url)
  let data = JSON.parse(response.body)
  return {
    cap: data.market_cap.map((x) => { return {date: x[0], value: x[1]} }),
    price: data.price.map((x) => { return {date: x[0], value: x[1]} })
  }
}

export async function current (coinName) {
  let data = await history(coinName, 1)
  return {
    cap: data.cap[data.cap.length - 1].value,
    price: data.price[data.price.length - 1].value
  }
}

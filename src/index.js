import got from 'got'

import symbols from './symbols.json'
const intervals = [1, 7, 30, 90, 180, 365]

export async function history (coinName, interval) {
  let symbol = symbols[coinName.toLowerCase()] || coinName
  let url = intervals.indexOf(interval) === -1
    ? ('http://www.coincap.io/history/' + symbol)
    : ('http://www.coincap.io/history/' + interval + 'day/' + symbol)

  let response = await got(url)
  let data = JSON.parse(response.body)
  return {cap: data.market_cap, price: data.price}
}

export async function current (coinName) {
  let data = await history(coinName, 1)
  return {
    cap: data.cap[data.cap.length - 1][1],
    price: data.price[data.price.length - 1][1]
  }
}

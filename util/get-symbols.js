import got from 'got'

;(async function () {
  let coins = {}

  let response = await got('http://www.coincap.io/map')
  for (let coin of JSON.parse(response.body)) {
    coins[coin.name.toLowerCase()] = coin.symbol
  }

  console.log(JSON.stringify(coins, null, 2))
})().catch(function (err) { console.error(err.stack) })

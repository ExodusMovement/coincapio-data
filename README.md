# coincapio-data

[![NPM Package](https://img.shields.io/npm/v/coincapio-data.svg?style=flat-square)](https://www.npmjs.org/package/coincapio-data)
[![Build Status](https://img.shields.io/travis/ExodusMovement/coincapio-data.svg?branch=master&style=flat-square)](https://travis-ci.org/ExodusMovement/coincapio-data)
[![Dependency status](https://img.shields.io/david/ExodusMovement/coincapio-data.svg?style=flat-square)](https://david-dm.org/ExodusMovement/coincapio-data#info=dependencies)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## API

Both methods takes coin name, you can find all available names in [symbols.json](blob/master/src/symbols.json). If symbols.json doesn't contain coin name that you need, just pass coin symbol. ([list on coinmap.io](http://www.coincap.io/map))

<hr>
#####`.history(String coinName [, Number interval])` -> `Promise`

Available intervals: 1, 7, 30, 90, 180, 365 or skip this if you want all data.

Return `{cap: {date: Number, value: Number}[], price: {date: Number, value: Number}[]}`

```javascript
var coincapio = require('coincapio-data')

coincapio.history('bitcoin', 365).then(function (data) {
  var maxPrice = data.price[0]
  data.price.forEach(function (price) {
    if (price.value > maxPrice.value) maxPrice = price
  })

  console.log('The higest price at the last year is ' + maxPrice.value + '$ at ' + new Date(maxPrice.date))
})
```

<hr>
#####`.current(String coinName)` -> `Promise`

Return `{cap: Number, price: Number}`.

```javascript
var coincapio = require('coincapio-data')

coincapio.current('bitcoin').then(function (data) {
  console.log('Current bitcoin price is: ' + data.price + '$ (capitalization: ' + data.cap + '$)')
})
```

or with with custom symbol for devcoin:

```javascript
var coincapio = require('coincapio-data')

coincapio.current('DVC').then(function (data) {
  console.log('Current devcoin price is: ' + data.price + '$ (capitalization: ' + data.cap + '$)')
})
```

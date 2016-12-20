#!/usr/bin/env node
'use strict'

const cheerio = require('cheerio')
const request = require('request')
const chalk = require('chalk')
const sksUrl = 'http://sks.itu.edu.tr'

/**
 * Scraps main page and extracts menu content from given wrapper
 * @param  {String}   wrapper  Wrapper element
 * @param  {Function} callback Called when request is completed
 */
const menu = (wrapper, callback) => {
  request(sksUrl, (err, resp, html) => {
    if (err) {
      console.log(chalk.underline.red(err))
      process.exit(1)
    }
    const $ = cheerio.load(html)
    callback()
    $(`${wrapper} li`)
      .each((i, li) => console.log('  · ' + $(li).text()))
  })
}

const lunch = () => menu('.ogle-yemegi', () => console.log(chalk.underline.blue('Öğle Yemeği Menüsü')))
const dinner = () => menu('.aksam-yemegi', () => console.log(chalk.underline.blue('Akşam Yemeği Menüsü')))

// try to determine menu from cli argument
let type = process.argv[2]
if (type) {
  // try to remove first arg dashes
  if (type.substr(0, 2) === '--') { type = type.substr(2) }
  if (type.substr(0, 1) === '-') {
    type = type.substr(1)
  }

  type = type.toLowerCase()
  switch (type) {
    case 'öğle':
    case 'ögle':
    case 'ogle':
    case 'lunch':
    case 'l':
    case 'o':
      lunch()
      break
    case 'akşam':
    case 'aksam':
    case 'dinner':
    case 'a':
      dinner()
      break
    case 'both':
    case 'b':
      lunch()
      dinner()
      break
    default:
      console.log(chalk.yellow(`Bad option: ${process.argv[2]}`))
      process.exit(1)
  }
} else {
  // If no argument passed determine what menu to be shown by time
  const h = new Date().getHours()
  if (h >= 14) {
    dinner()
  } else {
    lunch()
  }
}

'use strict'
// const { bootstrap } = require('bootstrap');

class MainController {
  async index ({ view }) {
    return view.render('main.index')
  }
}

module.exports = MainController

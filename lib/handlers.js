const fortune = require('./fortune')

exports.home = (req, res) => res.render('home') //exports home page

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() }) //exports about page while also generating a random fortune

exports.notFound = (req, res) => res.render('404') //exports 404 page

// Express recognizes the error handler by way of its four
// argumetns, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */

const express = require('express')
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main', //uses main.handlebars as the layout for all views
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
app.set('view engine', 'handlebars') //tells express to use handlebars

const port = process.env.PORT || 3000 //sets the port

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddleware)

app.get('/', handlers.home) //loads the home.handlebars page
app.get('/section-test', handlers.sectionTest) //loads section-test.handlebars

app.use(handlers.notFound) //loads 404 page
app.use(handlers.serverError) //loads 500 page

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}

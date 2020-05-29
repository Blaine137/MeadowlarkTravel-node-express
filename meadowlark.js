const express = require('express') //imports express
const expressHandlebars = require('express-handlebars') //imports handlerbars for express

const handlers = require('./lib/handlers') //imports handlers.js 

const port = process.env.PORT || 3000 //sets the default port

app.use(express.static(__dirname + '/public'))

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/', handlers.home) //loads home page

app.get('/about', handlers.about) //loads about page

// custom 404 page
app.use(handlers.notFound) //loads 404 error page

// custom 500 page
app.use(handlers.serverError) //loads 500 page

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  }) 
} else {
  module.exports = app
}

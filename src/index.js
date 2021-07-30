const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const port = 3000

const route = require('./routes') // auto get file index.js at routes folder

const app = express() // create instance of express

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
})) // xu li du lieu tu form (form data)
app.use(express.json()) // xu li du lieu tu form (form data)

// HTTP logger
// app.use(morgan('combined'))

// Template Engine
app.engine('.hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)
 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
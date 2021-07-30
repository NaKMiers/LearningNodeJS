const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const port = 3000

const app = express()

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

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})

app.get('/search', (req, res) => {
  res.render('search')
})

app.post('/search', (req, res) => {
  console.log(req.body)
  res.send('nguyen anh khoa')
})
 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
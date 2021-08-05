const express = require('express')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const port = 3000
const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes') // auto get file index.js at routes folder
const db = require('./config/db')

// connect to db
db.connect()

const app = express() // create instance of express

// method override
app.use(methodOverride('_method'))

// custom middleware
app.use(SortMiddleware)

app.use(express.static(path.join(__dirname, 'public')))

app.use(
    express.urlencoded({
        extended: true,
    }),
) // xu li du lieu tu form (form data)
app.use(express.json()) // xu li du lieu tu form (form data)

// HTTP logger
// app.use(morgan('combined'))

// template Engine
app.engine(
    '.hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `
                    <a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>
                `
            },
        },
    }),
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
// https://es.stackoverflow.com/questions/497722/typeerror-exphbs-is-not-a-function
const methodOverride = require('method-override')
const session = require('express-session')

// INITIALIZATIONS
const app = express()
require('./database')

//  SETTINGS
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, '/views'))
app.engine('.hbs', engine({
 defaultLayout: 'main',
 layoutsDir: path.join(app.get('views'), 'layouts'),
 partialsDir: path.join(app.get('views'), 'partials'),
 extname: '.hbs'
}))
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false })) // solo datos
app.use(methodOverride('_method')) // para neviar mas methodos
app.use(session({
 secret: 'mysecretapp',
 resave: true,
 saveUninitialized: true
}))
// GLOBAL VARIABLES


//  ROUTES
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')))

// SERVER LISTEN
app.listen(app.get('port'), () => {
 console.log('Server on port', app.get('port'))
})
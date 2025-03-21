const express = require('express')
const path = require('path')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const app = express()
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Built in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))


// built in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))


app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/subdir', require('./routes/subdir'))
app.use('/refresh', require('./routes/refresh'))

app.use(verifyJWT)

app.use('/employees', require('./routes/api/employees'))


// app.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile('./views/index.html', { root: __dirname})
// })

// app.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
// })

// app.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, '/new-page.html')
// })

// app.get('/prev-page(.html)?', (req, res) => {
//     res.redirect('/new-page.html') // default 302 status code
// })



// const one = (req, res, next) => {
//     console.log('one');
//     next();
// }
// const two = (req, res, next) => {
//     console.log('two');
//     next();
// }
// const three = (req, res) => {
//     console.log('three');
//     res.send('Finished!');
// }

// app.get('/chain(.html)?', [one, two, three])


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
       res.sendFile(path.join(__dirname, 'views', '404.html')) 
    } else if (req.accepts('json')) {
        res.json({ error: "404 not Found"})
    } else {
        res.type('txt').send("404 not Found")
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
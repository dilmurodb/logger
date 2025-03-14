const express = require('express')
const path = require('path')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3500

// custom middleware logger
app.use(logger)

// Cross Origin Resource Sharing
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Built in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))


//built in middleware for json
app.use(express.json())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))


app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
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
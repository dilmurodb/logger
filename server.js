const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3500

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname})
})

app.get('/404(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(302, '/404.html')
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
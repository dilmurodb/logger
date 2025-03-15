const express = require('express')
const path = require('path')
const router = express.Router()

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/prev-page(.html)?', (req, res) => {
    res.redirect(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
})



module.exports = router
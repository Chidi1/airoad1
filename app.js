// Imports
const express = require('express')
const app = express()
const port = 5500

//Routing pages
app.use(express.static('public'))
app.use('/css', express.static(__dirname = 'public/css'))
app.use('/js', express.static(__dirname = 'public/js'))
app.use('/img', express.static(__dirname = 'public/img'))
app.use('/scss', express.static(__dirname = 'public/scss'))


//Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

//Display pages (views)
app.get('',(req, res) => {
    res.render('login')
})

app.get('/index',(req, res) => {
    res.render('index')
})

app.get('/register',(req, res) => {
    res.render('register')
})

app.get('/notification',(req, res) => {
    res.render('notification')
})

app.get('/customers',(req, res) => {
    res.render('customers')
})

app.get('/allcustomers',(req, res) => {
    res.render('allcustomers')
})

app.get('/forgot-password',(req, res) => {
    res.render('forgot-password')
})







//Listen on port 4000
app.listen(port, () => console.info('Listening on port ${port}'))
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', { // view폴더에 있는 hbs의 파일명
        title: 'Weather App',
        name: '이인우'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "이인우"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "무엇을 도와드릴까요?",
        title: 'Help',
        name: "이인우"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: '지명을 입력해주세요'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => { // data destructuring
        if (error) {
            return res.send({ error })
        } // if else 안쓰기 위해 return 구문 썼음
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } // if else 안쓰기 위해 return 구문 썼음
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
        // else문을 쓰지 않기 위해 return으로 함수 종료
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help_404', {
        title: "help_404",
        name: "이인우",
        message: "help와 관련한 페이지를 찾을 수 없습니다."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "이인우",
        message: "페이지를 찾을 수 없습니다."
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
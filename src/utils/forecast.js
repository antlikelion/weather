const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/eeb51ccfe4648db3a9a4340f355f3c70/${latitude},${longtitude}?lang=ko`
    request({ url, json: true }, (error, { body }) => { // response내부의 body

        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find forcasting information. Try another search.', undefined)
        } else {
            summary = body.daily.data[0].summary
            degree = body.currently.temperature
            chanceOfRain = body.currently.precipProbability
            callback(undefined, `${summary} It is currently ${degree} degrees out. There is a ${chanceOfRain * 100}% chance of rain`)
        }
    })
}

module.exports = forecast

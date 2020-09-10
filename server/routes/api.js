const express = require('express')
const router = express.Router()
const axios = require('axios');
const City = require('../model/city');
const moment = require('moment')



router.get(`/cityG/:lat/:long`, async  (req, res) => {
    try {
        const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.long}&units=metric&appid=d6174f17d455416608473e75c33f820d`)
        res.send(data.data)
    } catch (error) {
        res.send('err')
    }

})

router.get(`/city/:cityName`, async (req, res) => {
    
    try {
        const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=metric&appid=d6174f17d455416608473e75c33f820d`)
        res.send(data.data)
    } catch (error) {
        res.send('err')
    }

})

router.get(`/cities`, async (req, res) => {
    const Cities = await City.find({})
    res.send(Cities)
})
router.post(`/city`, async (req, res) => {
    const reqq = req.body
    console.log(reqq);
    reqq.updatedAt = new moment
    // reqq.updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a')
    const newCity = new City(reqq)
    const ifCity = await City.find({})
    const cityy = ifCity.find(c => c.cityName === reqq.cityName)
    if (!cityy) {
        newCity.save()
    }
})


router.delete(`/city/:cityName`, async (req, res) => {
    const cityName = req.params.cityName
    await City.deleteMany({ cityName: cityName })
    res.end()
})

router.put(`/city/:cityName`, async (req, res) => {
    const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=metric&appid=d6174f17d455416608473e75c33f820d`)
    const ifCity = await City.findOne({ cityName: req.params.cityName })
    
    if (!ifCity) {
        const updatedCityNotIndb = {
            updatedAt: new Date(),
            cityName: data.data.name,
            country: data.data.sys.country,
            description: data.data.weather[0].description,
            temperature: data.data.main.temp,
            feels_Like: data.data.main.temp.feels_Like,
            icon: data.data.weather[0].icon,
            id: data.data.weather[0].id
        }
        res.send(updatedCityNotIndb)

    } else {
        ifCity.updatedAt = new Date()
        ifCity.save()
        res.send(ifCity)
    }

})



module.exports = router



const express = require('express')
const router = express.Router()
const axios = require('axios');
const City = require('../model/city');
const moment = require('moment')


//gioFindMe - sending location
router.get(`/cityG/:lat/:long`, async (req, res) => {
    try {
        const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.long}&units=metric&appid=d6174f17d455416608473e75c33f820d`)
        res.send(data.data)
    } catch (error) {
        res.send('err')
    }

})

// getCityData - getting city data from api and sending it back
router.get(`/city/:cityName`, async (req, res) => {

    try {
        const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=metric&appid=d6174f17d455416608473e75c33f820d`)
        res.send(data.data)
    } catch (error) {
        res.send('err')
    }

})
// getDataFromDB - onload page getting data for rendering
router.get(`/cities`, async (req, res) => {
    try {
        const Cities = await City.find({})
        res.send(Cities)
    } catch (error) {
        res.send('err')
    }
})
//saveCity - getting the the obj city to save to db
router.post(`/city`, async (req, res) => {
    try {
        const reqq = req.body
        console.log(reqq);
        reqq.updatedAt = new moment
        const newCity = new City(reqq)
        console.log(newCity);
        const ifCity = await City.find({})
        const cityy = ifCity.find(c => c.cityName === reqq.cityName)
        if (!cityy) {
            newCity.save()
            res.send(newCity)
        }
    } catch (error) {
        res.send('err')
    }

})

//deleteCity - deletting city from db
router.delete(`/city/:cityName`, async (req, res) => {
    try {
        const cityName = req.params.cityName
        await City.deleteMany({ cityName: cityName })
        res.end()  
    } catch (error) {
        res.send('err')
    }
})
//updateCity - getting new api to update city data
router.put(`/city/:cityName`, async (req, res) => {
    try {
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
        
    } catch (error) {
        res.send('err')
    }

})



module.exports = router



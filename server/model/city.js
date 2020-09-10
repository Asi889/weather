const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
  updatedAt: Date,
  cityName: String,
  country : String,
  description: String,
  temperature: Number,
  feels_Like: Number,
  icon: String,
  id: Number
})

const City = mongoose.model('city', citySchema)
module.exports = City



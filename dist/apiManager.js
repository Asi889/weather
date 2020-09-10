
class TempManager {

    constructor() {
        this.cityData = [];

    }
    async getDataFromDB() {
        const data = await $.get(`/cities`)
        this.cityData = [...this.cityData, ...data]
        this.cityData.forEach(i => {
            i.updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a')

        });
    }


    async geoFindMe(position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const latLang = latitude + "/" + longitude

        const data = await $.get(`/cityG/${latLang}`)

        let convertedFromFToC = data.main.temp - 273.15
        let realFeelconvertedFromFToC = data.main.feels_like - 273.15
        convertedFromFToC = convertedFromFToC.toFixed(1)
        realFeelconvertedFromFToC = realFeelconvertedFromFToC.toFixed(1)
        const cityData = {
            updatedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            cityName: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            temperature: convertedFromFToC,
            feels_Like: realFeelconvertedFromFToC,
            icon: data.weather[0].icon,
            id: data.weather[0].id
        }

        const cityy = this.cityData.find(c => c.cityName === cityData.cityName)
        if (!cityy || this.cityData.length < 1) {
            this.cityData.push(cityData)
        } else {
            console.log(`booya`);
        }
    }




    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        let converted = data.main.temp - 273.15
        let realConverted = data.main.feels_like - 273.15
        converted = converted.toFixed(1)
        realConverted = realConverted.toFixed(1)
        const cityData = {
            updatedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            cityName: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            temperature: converted,
            feels_Like: realConverted,
            icon: data.weather[0].icon,
            id: data.weather[0].id

        }
        const cityy = this.cityData.find(c => c.cityName === cityData.cityName)
        if (!cityy || this.cityData.length < 1) {
            this.cityData.push(cityData)

        } else {
            console.log(this.cityData);
        }

    }



    saveCity(cityName) {
        for (let i in this.cityData) {
            if (cityName === this.cityData[i].cityName) {
                $.post(`/city`, this.cityData[i], (data) => {
                    const cityy = this.cityData.find(c => c.cityName === data.cityName)
                    if (!cityy) {
                        this.cityData.push(cityy)
                    } else {
                        console.log(`city is already saved`);
                    }
                })
            } else {
                console.log(`city already in data-base`);
            }
        }

    }

    async deleteCity(cityName) {
        await $.ajax({
            method: "DELETE",
            url: `/city/${cityName}`,
            success: () => {
                console.log(`entered success`);
                this.cityData = this.cityData.filter(i => i.cityName !== cityName)
            }
        })
    }

    async updateCity(cityname) {
        await $.ajax({
            method: "PUT",
            url: `/city/${cityname}`,
            success: (data) => {

                for (let i in this.cityData) {
                    if (this.cityData[i]._id === data._id) {
                        this.cityData[i] = data
                        this.cityData[i].updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a')
                    }
                }
            }
        })

    }

}


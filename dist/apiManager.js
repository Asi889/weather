

class TempManager {

    constructor() {
        this.cityData = [];
        this.listCityData= []
    }

    async getDataFromDB() {
        const data = await $.get(`/cities`)
        this.listCityData = [...this.listCityData, ...data]
    }

    async geoFindMe(position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const latLang = latitude + "/" + longitude

        const data = await $.get(`/cityG/${latLang}`)

        const cityData = {
            updatedAt: new moment().format('MMMM Do YYYY, h:mm:ss a'),
            cityName: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            temperature: data.main.temp,
            feels_Like: data.main.temp.feels_Like,
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

        const cityData = {
            cityName: data.name,
            updatedAt: new moment().format('MMMM Do YYYY, h:mm:ss a'),
            country: data.sys.country,
            description: data.weather[0].description,
            temperature: data.main.temp,
            feels_Like: data.main.temp.feels_Like,
            icon: data.weather[0].icon,
            id: data.weather[0].id

        }
        const cityy = this.listCityData.find(c => c.cityName === cityData.cityName)
        if (!cityy ) {
            this.listCityData.push(cityData)

        } else {
            console.log(this.cityData);
        }

    }

    saveCity(cityName) {
        for (let i in this.listCityData) {
            if (cityName === this.listCityData[i].cityName) {
                $.post(`/city`, this.listCityData[i], (data) => {
                    console.log(data);
                    const cityy = this.listCityData.find(c => c.cityName === data.cityName)
                    console.log(cityy);
                    if (!cityy) {
                        this.listCityData.push(cityy)
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
                this.listCityData = this.listCityData.filter(i => i.cityName !== cityName)
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
                        // this.cityData[i].updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a')
                    }
                }
            }
        })

    }

}


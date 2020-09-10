const temp = new TempManager()
const rend = new Renderer()


const loadPage = async (cords) => {
    let x = new moment()

    await temp.geoFindMe(cords)
    await temp.getDataFromDB()

    let oo = temp.cityData[1].updatedAt
    let duration = moment.duration(x.diff(oo))
    console.log(duration);


    if (duration._data.hours > 3) {
        await temp.updateCity($cityName)
        rend.renderData(temp.cityData)

    } else {
        rend.renderData(temp.cityData)
    }

}

if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
} else {
    navigator.geolocation.getCurrentPosition((position) => {
        loadPage(position)
    })
}



const handleSearch = async () => {
    const $input = $(`input`).val()
    await temp.getCityData($input)
    rend.renderData(temp.cityData)
}

$(`.searchBtn`).on("click", async () => {
    handleSearch()
})

$(`#list`).on("click", ".save", function () {
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    temp.saveCity($cityName)
})

$(`#list`).on("click", ".remove", async function () {
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.deleteCity($cityName)
    rend.renderData(temp.cityData)
    
})

$(`#list`).on(`click`, `.refresh`, async function () {
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.updateCity($cityName)
    rend.renderData(temp.cityData)

})












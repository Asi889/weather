const temp = new TempManager()
const rend = new Renderer()

// on loadpage first geting current time / then coordinates(Lat/Long) 
// then checking if there is a saved city- if there is we check if the duration is 
// more then 3 hours to update the db or not.
const loadPage = async function (cords) {

    const currentTime = new moment()

    await temp.geoFindMe(cords)
    await temp.getDataFromDB()

    if (temp.cityData.length > 1) {
        let firstSavedCity = temp.cityData[1].updatedAt
        const duration = moment.duration(currentTime.diff(firstSavedCity))._data.hours

        if (duration > 3) {
            console.log(`boom`);
            temp.cityData.forEach(i => { temp.updateCity(i.cityName) });
            rend.renderData(temp.cityData)
        } else {

            rend.renderData(temp.cityData)
        }
        console.log(`works`);

    } else {
        rend.renderData(temp.cityData)
    }

}

//getting location from browser and invoking loadpage with position 
if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
} else {
    navigator.geolocation.getCurrentPosition((position) => {
        loadPage(position)
    })
}

$(`.searchBtn`).on("click", async function () {
    const $input = $(`input`).val()
    await temp.getCityData($input)
    // rend.renderData22(temp.cityData)
    rend.renderData22(temp.listCityData)

})
///save
$(`#main`).on("click", ".fa-download", function () {
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    temp.saveCity($cityName)
})

$(`#main`).on("click", ".remove", async function () {

    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.deleteCity($cityName)
    // rend.renderData22(temp.cityData)
    rend.renderData(temp.cityData)


})
//refersh data
$(`#main`).on(`click`, `.fa-sync`, async function () {
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.updateCity($cityName)
    rend.renderData(temp.cityData)

})












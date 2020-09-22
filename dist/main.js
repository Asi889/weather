const temp = new TempManager()
const rend = new Renderer()



// on loadpage first geting current time / then coordinates(Lat/Long) 
// then checking if there is a saved city- if there is we check if the duration is 
// more then 3 hours to update the db or not.
const loadPage = async function (cords) {

    const currentTime = new moment()
    console.log(currentTime);

    await temp.geoFindMe(cords)
    await temp.getDataFromDB()

    if (temp.listCityData.length > 0) {
        let firstSavedCity = temp.listCityData[0].updatedAt
        const duration = moment.duration(currentTime.diff(firstSavedCity))._data.hours
        console.log(duration);

        if (duration > 3) {
            console.log(`boom`);
            temp.cityData.forEach(i => { temp.updateCity(i.cityName) });
            rend.renderData(temp.cityData)
            rend.renderList(temp.listCityData)

        } else {

            rend.renderData(temp.cityData)
            rend.renderList(temp.listCityData)
        }
        console.log(`works`);

    } else {
        rend.renderData(temp.cityData)
        // rend.renderData22(temp.listCityData)

    }

}

//getting location from browser and invoking loadpage with position - coordanits
if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
} else {
    navigator.geolocation.getCurrentPosition((position) => {
        loadPage(position)
    })
}

//get data 
$('#text1').keydown( async function (event) {
    if (event.which == '13') {
        const $input = $(`input`).val()
        event.preventDefault();
        event.stopPropagation();
        await temp.getCityData($input)
        rend.renderList(temp.listCityData)
    }
});




//save to db
$(`#list`).on("click", ".fa-download", function () {
    const $cityName = $(this).closest(`.listCity`).find(`.cityNamel`).text()
    console.log();
    console.log($cityName);
    temp.saveCity($cityName)
})
//remove
$(`#list`).on("click", ".remove", async function () {

    const $cityName = $(this).closest(`.listCity`).find(`.cityNamel`).text()
    await temp.deleteCity($cityName)
    rend.renderList(temp.listCityData)


})
//refersh data
$(`#main`).on(`click`, `.fa-sync`, async function () {
    console.log(`heh`);
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    console.log($cityName);
    await temp.updateCity($cityName)
    rend.renderData(temp.cityData)

})
















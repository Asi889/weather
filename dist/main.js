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
        // console.log(duration);

        if (duration > 3) {
            console.log(`boom`);
            temp.cityData.forEach(i => { temp.updateCity(i.cityName) });
            rend.renderData(temp.cityData)
            rend.renderData22(temp.listCityData)

        } else {

            rend.renderData(temp.cityData)
            rend.renderData22(temp.listCityData)
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







$(`.searchBtn`).on("click", async function () {
    const $input = $(`input`).val()
    await temp.getCityData($input)
    rend.renderData22(temp.listCityData)

})

///save
$(`#list`).on("click", ".fa-download", function () {
    const $cityName = $(this).closest(`.listCity`).find(`.cityNamel`).text()
    console.log();
    console.log($cityName);
    temp.saveCity($cityName)
})

$(`#list`).on("click", ".remove", async function () {

    const $cityName = $(this).closest(`.listCity`).find(`.cityNamel`).text()
    await temp.deleteCity($cityName)
    rend.renderData22(temp.listCityData)


})
//refersh data
$(`#main`).on(`click`, `.fa-sync`, async function () {
    console.log(`heh`);
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.updateCity($cityName)
    rend.renderData(temp.cityData)

})

// function handle(e){
//     if(e.keyCode === 13){
//         e.preventDefault(); // Ensure it is only this code that rusn

//         alert("Enter was pressed was presses");
//     }
// }
// $(`#text`).on('keypress', function (e) {
//     if (which == 13) {
//         alert('You pressed enter!');
//     }
// });


// $("#text").keypress(function () {
//     console.log();
// });


// $("#text").on("keyup",function (event) {
//     if (event.keyCode == 13) {
//         $("#id_of_button").click();
//     }
// });













const temp = new TempManager()
const rend = new Renderer()
const time = moment().format('MMMM Do YYYY, h:mm:ss a')


const loadPage = async (cords) => {

    console.log(`hello`);
    const newTime = moment().format('MMMM Do YYYY, h:mm:ss ')
    await temp.geoFindMe(cords)
    await temp.getDataFromDB()
    const oo = temp.cityData[0].updatedAt
    console.log(oo);
    


    rend.renderData(temp.cityData)

    // const ww= temp.cityData[1].updatedAt
    // const tt=   new Date() - ww
    // console.log(newTime)
    // if(newTime<ww){
    //     console.log(`he`);

    // }else{
    //     console.log(`ho`);
    // }
    // console.log(ww);;
    // console.log(tt);
    // if(!(temp.cityData[0].updateCity-time)<1){

    // }

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
    console.log(`hu`);
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.deleteCity($cityName)
    // await temp.getDataFromDB()
    console.log(temp.cityData);
    rend.renderData(temp.cityData)
    setTimeout(() => {

    }, 2000);


})

$(`#list`).on(`click`, `.refresh`, async function () {
    const $cityName = $(this).closest(`.city`).find(`.cityName`).text()
    await temp.updateCity($cityName)
    rend.renderData(temp.cityData)

})












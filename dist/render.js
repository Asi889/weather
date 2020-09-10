class Renderer {
    
    renderData(allCityData) {
        $('#list').empty()
        const source = $(`#first-template`).html();
        const template = Handlebars.compile(source);
        let newHTML = template({allCityData});
         $('#list').append(newHTML);

    }
    
}
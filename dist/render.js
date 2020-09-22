class Renderer {
    
    renderData(allCityData) {
        $('#main').empty()
        const source = $(`#first-template`).html();
        const template = Handlebars.compile(source);
        let newHTML = template({allCityData});
         $('#main').append(newHTML);

    }

    renderList(allCityData) {
        $('#list').empty()
        const source = $(`#second-template`).html();
        const template = Handlebars.compile(source);
        let newHTML = template({allCityData});
         $('#list').append(newHTML);


    }
    
}
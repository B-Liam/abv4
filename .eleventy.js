const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/_redirects");
    eleventyConfig.addFilter("getPlants", function(arr, month) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if ( arr[i][month] == "n") {
                continue;
            }
            else {
                newObject = { "plant": arr[i].plant, "category": arr[i].category, "month": arr[i][month] }
                interim.push(newObject)
            }
        }
        return interim;
      });
      eleventyConfig.addFilter("getNutrition", function(arr, element) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            let interimObject = { "name": arr[i].name, "percentage": arr[i][element], "grow": arr[i].grow, "link": arr[i].link }
            interim.push(interimObject);
        }
        return interim;
      });
      eleventyConfig.addFilter("getBlog", function(arr, element) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            let interimObject = { "title": arr[i].content.title, "description": arr[i].content.seo_description, "category": arr[i].content.category, "image": arr[i].content.lead_image.filename, "slug": arr[i].slug }
            interim.push(interimObject);
        }
        return interim;
      });
      eleventyConfig.addFilter("getPowerTool", function(arr, element, cat) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if ( arr[i].product == element && arr[i].cats.includes(cat)) {
                interim.push(arr[i])
            }
        }
        return interim;
      });
      eleventyConfig.addFilter("getPhotos", function(arr,number) {
        let interim = [];
        for (let i = 0 ; i < number ; i++ ) {
            let interimObject = { "title": arr[i].name, "image": arr[i].photos[0].url, "date": arr[i].date }
            interim.push(interimObject)
            }
        return interim;
      });
      eleventyConfig.addFilter("getContentPages", function(arr,cat) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if (arr[i].content.category == cat ) {
                let interimObject = { title: arr[i].content.title, slug: arr[i].slug, order: arr[i].content.order, category: arr[i].content.category, image: arr[i].content.lead_image.filename }
                interim.push( interimObject );
            }
        }
        return interim;
      });
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPlugin(embedEverything);
    return  {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data"
        }
    };
};
const embedEverything = require("eleventy-plugin-embed-everything");
const markdownShortcode = require("eleventy-plugin-markdown-shortcode");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(markdownShortcode);
    eleventyConfig.addPassthroughCopy("src/_redirects");
    eleventyConfig.addShortcode("liamMark", function(text) {
        var md = require('markdown-it')({html:true,breaks:true,linkify:true});
        var result = md.render(text);
            return result;
          });
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
        let returnItems = number;
        if (arr.length < number) {
            returnItems = arr.length
        } 
        for (let i = 0 ; i < returnItems ; i++ ) {
            let interimObject = { "title": arr[i].name, "image": arr[i].photos[0].url, "date": arr[i].date, "introduction": arr[i].introduction }
            interim.push(interimObject)
            }
        return interim;
      });
      eleventyConfig.addFilter("getVideos", function(arr,number) {
        let interim = [];
        for (let i = 0 ; i < number ; i++ ) {
            interim.push(arr[i]);
            }
        return interim;
      });
      eleventyConfig.addFilter("getContentPages", function(arr,cat) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if (arr[i].content.category == cat ) {
                let interimObject = { title: arr[i].content.title, slug: arr[i].slug, order: arr[i].content.order, category: arr[i].content.category, image: arr[i].content.lead_image.filename, description: arr[i].content.excerpt }
                interim.push( interimObject );
            }
        }
        return interim;
      });
      eleventyConfig.addFilter("getPlantData", function(arr,name) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if ( arr[i].plant == name) {
                interim.push(arr[i])
            } 
            }
        return interim;
      });
      eleventyConfig.addFilter("getTableSymbol", function(arr,arrname,name,month) {
        if ( arrname == "sow-indoor" || arrname == "sow-outdoor" || arrname == "facts-harvest" ){
        for (let i = 0 ; i < arr.length ; i++ ) {
            if ( arr[i].plant == name && arr[i][month] == "y" ) {
                return (`✔`)
            } 
            }
        }
        if (arrname == "store-method") {
            for (let i = 0 ; i < arr.length ; i++ ) {
                if ( arr[i].plant == name && arr[i][month] == "frozen" ) {
                    return (`<img style="height:15px; width:14px" src="/images/uploads/frozen.webp" />`)
                }
                if ( arr[i].plant == name && arr[i][month] == "store" ) {
                    return (`<img style="height:15px; width:14px" src="/images/uploads/store.webp" />`)
                }
                if ( arr[i].plant == name && arr[i][month] == "jar" ) {
                    return (`<img style="width:9px;height:15px" src="/images/uploads/jar-icon.webp" />`)
                } 
                }
        }
      });
      eleventyConfig.addFilter("getPlantPhotos", function(arr,vegname) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if ( arr[i].name == vegname) {
                interim.push(arr[i])
            } 
            }
        return interim;
      });
      eleventyConfig.addFilter("findIndexValue", function(arr, slug) {
        let interim = null;
        for ( let i = 0 ; i < arr.length ; i++ ){
            if ( arr[i].slug == slug ) {
                interim = i;
            }
        }
        return interim;
      });
      eleventyConfig.addFilter("getFeaturedPlants", function(arr,plantname,plantcategory,number) {
        let interim = [];
        if ( plantcategory == "vegetable") {
        for (let i = 0 ; i < arr.length ; i++ ) {
            if (arr[i].vegetable == plantname && interim.length < number && arr[i].featured == "yes" ) {
                let interimObject = { "name": arr[i].name, "price": arr[i].price, "type": arr[i].type, "image": arr[i].image, "merchant": arr[i].merchant, "link": arr[i].deeplink }
                interim.push(interimObject);
                }
            }
        }
        if ( plantcategory == "fruit") {
            for (let i = 0 ; i < arr.length ; i++ ) {
                if (arr[i].fruit == plantname && interim.length < number && arr[i].featured == "yes" ) {
                    let interimObject = { "name": arr[i].name, "price": arr[i].price, "type": arr[i].type, "image": arr[i].image, "merchant": arr[i].merchant, "link": arr[i].deeplink }
                    interim.push(interimObject);
                }
            }
        }
        if ( plantcategory == "herb") {
            for (let i = 0 ; i < arr.length ; i++ ) {
                if (arr[i].herb == plantname && interim.length < number && arr[i].featured == "yes" ) {
                    let interimObject = { "name": arr[i].name, "price": arr[i].price, "type": arr[i].type, "image": arr[i].image, "merchant": arr[i].merchant, "link": arr[i].deeplink }
                    interim.push(interimObject);
                }
            }
        }
        return interim;
      });
      eleventyConfig.addFilter("getFeaturedEquipment", function(arr,productname,number) {
        let interim = [];
        for (let i = 0 ; i < arr.length ; i++ ) {
            if (arr[i].product == productname && interim.length < number && arr[i].featured == "yes") {
                let interimObject = { "name": arr[i].name, "price": arr[i].price, "type": arr[i].type, "image": arr[i].image, "merchant": arr[i].merchant, "link": arr[i].deeplink }
                interim.push(interimObject);
                }
            }
        return interim;
    });
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/googledaf234788d4c7021.html");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPlugin(embedEverything);
    return  {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data"
        }
    };
};
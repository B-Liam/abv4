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
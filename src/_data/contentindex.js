const axios = require('axios').default;
require('dotenv').config();

let time = null;
let combinedIndex = [];
let recipePages = null;
let introPages = null;
let vegPages = null;

//get the current time, to act as a server time stamp on the api call
function getTime() {
 time = Date.now()
}
getTime();

//this builds the index for the different pages
function buildIndex(arr,dest) {
    for ( i = 0 ; i < arr.length ; i++) {
        let newObject = { title: arr[i].content.title, slug: arr[i].slug, order: arr[i].content.order, category: arr[i].content.category, image: arr[i].content.lead_image.filename }
        dest.push( newObject );
    }
}

//this gets the recipes from StoryBlok
getRecipes = async function() {

   try {
    const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&per_page=100&starts_with=recipes&cv=${time}`);
    recipePages = response.data.stories;

    buildIndex(recipePages,combinedIndex);

    return newRecipeIndex

  } catch (error) {
    console.error(error);
  }
};

//this gets the intro pages from StoryBlok
getIntro = async function() {
  
    try {
      const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&per_page=100&starts_with=pages&cv=${time}`);
      introPages = response.data.stories;
  
      buildIndex(introPages,combinedIndex);
  
      return newIntroIndex
  
    } catch (error) {
      console.error(error);
    }
};

//this gets the growing pages from StoryBlok
getGrowing = async function() {
  
    try {
      const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&per_page=100&starts_with=vegetables&cv=${time}`);
      vegPages = response.data.stories;
  
      buildIndex(vegPages,combinedIndex);
  
      return newIntroIndex
  
    } catch (error) {
      console.error(error);
    }
};

async function combine() {
    await getRecipes();
    await getIntro();
    await getGrowing();
    combinedIndex.sort (function (a,b) {
      return a.order - b.order
 });
}
combine();

module.exports = function() {
    return combinedIndex;
};
const axios = require('axios').default;
require('dotenv').config();

let time = null;
let newIndex = [];
let page = null;

function getTime() {
 time = Date.now()
}

function buildIndex() {
    for ( i = 0 ; i < page.length ; i++) {
        let newObject = { title: page[i].content.title, slug: page[i].slug, order: page[i].content.order, category: page[i].content.category, image: page[i].content.lead_image.filename }
        newIndex.push( newObject );
    }
}

module.exports = async function() {

  await getTime();

  try {
    const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&per_page=100&starts_with=recipes&cv=${time}`);
    page = response.data.stories;

    buildIndex();

    return newIndex

  } catch (error) {
    console.error(error);
  }
};
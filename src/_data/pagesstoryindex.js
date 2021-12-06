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
        let newObject = { title: page[i].content.title, slug: page[i].slug, order: page[i].content.order, category: page[i].content.category }
        newIndex.push( newObject );
    }
}

module.exports = async function() {

  await getTime();

  try {
    const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&starts_with=pages&cv=${time}`);
    page = response.data.stories;

    buildIndex();

    return newIndex

  } catch (error) {
    console.error(error);
  }
};
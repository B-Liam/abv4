const axios = require('axios').default;
require('dotenv').config();

let time = null;

function getTime() {
 time = Date.now()
}

module.exports = async function() {
  await getTime();
  try {
    const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&per_page=100&starts_with=recipes&cv=${time}`);
    page = response.data.stories;
    return {
      page
    }
  } catch (error) {
    console.error(error);
  }
};
const axios = require('axios').default;
require('dotenv').config();

module.exports = async function() {
    try {
      const response = await axios.get(`https://api.storyblok.com/v1/cdn/stories/?token=${process.env.STORYBLOK_KEY}&starts_with=pages&cv=11`);
      page = response.data.stories;
      return {
        page
      }
    } catch (error) {
      console.error(error);
    }
  };
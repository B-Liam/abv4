const axios = require('axios').default;
require('dotenv').config();

module.exports = async function() {
    try {
      const response = await axios.get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${process.env.STORYBLOK_KEY}`);
      version = response.data.space.version;
      return {
        version
      }
    } catch (error) {
      console.error(error);
    }
};
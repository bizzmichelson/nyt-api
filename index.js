require('dotenv').config();
const fetch = require('node-fetch');
const API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = process.env.NEW_YORK_TIMES_API_KEY;

module.exports = async (req, res) => {
  try {
    const request = await fetch(`${ROOT_URL}?api-key=${API_KEY}`);
    const body = await request.json();
    return body;
  } catch (error) {
    throw error;
  }
};

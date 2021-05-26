const axios = require('axios');
require('dotenv').config();

module.exports = async (msg, args) => {

    let str = String(...args);
    if (args.length === 0) str = "vibing cat";
    console.log(str)

    const response = await axios.get(`${process.env.TENOR_URL}${str}&key=${process.env.TENOR_TOKEN}&limit=10`)
    const url = response.data.results[Math.floor(Math.random()*10)].url;
    msg.channel.send(url)
}

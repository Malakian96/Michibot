const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
    console.log('saludos :D')
})

const commandHandler = require("./commands");
client.on('message', commandHandler);

client.login(process.env.TOKEN);
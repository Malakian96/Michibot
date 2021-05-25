const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const { prefix } = require("../config.json");

client.once('ready', () => {
    console.log('saludos :D')
})

client.on('message', msg => {
    const { content } = msg;
    if(content.startsWith(prefix)){
        msg.channel.send(" https://cdn.discordapp.com/attachments/329017785705562116/783852284068364299/image0.gif");
    }
})


client.login(process.env.TOKEN);
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require("../config.json");
const { textCommands, voiceCommands } = require("./controllers/commands");

require('dotenv').config();

client.once('ready', () => {
    client.user.setPresence({
        activity: {
          name: `El michibot | ${prefix}help`,
          type: ' '
        },
        status: 'online',
      }).then(presence => {
          console.log(`Activity set to "${presence.activities[0].name}"`);
      }).catch(console.error);
})


client.on('message', textCommands);
//client.on('voiceStateUpdate', voiceCommands);

client.login(process.env.TOKEN);
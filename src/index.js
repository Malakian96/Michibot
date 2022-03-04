const Discord = require('discord.js');
//const client = new Discord.Client();
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
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

client.on('messageReactionAdd', async (reaction_orig, user) => {
  // fetch the message if it's not cached
  client.channels.cache.get('949411730755309629').messages.fetch("949421326207180840");
  const message = !reaction_orig.message.author
    ? await reaction_orig.message.fetch()
    : reaction_orig.message;
  
    message.guild.members.cache.get(user.id).roles.add('949411730465886239');
        
  if (message.author.id === user.id) {
    // the reaction is coming from the same user who posted the message
    return;
  }
  
  // the reaction is coming from a different user
  //manageBoard(reaction_orig);
});
client.on('message', textCommands);
//client.on('voiceStateUpdate', voiceCommands);

client.login(process.env.TOKEN);
const fs = require('fs');
const Discord = require('discord.js');

let dispatcher;
let audio;
let voiceChannel;
let textChannel;
let fileData;

module.exports = async (bot, channel) => {
  voiceChannel = bot.channels.cache.get(channel);
  textChannel = bot.channels.cache.get('783440033687273482');
  if (!voiceChannel) return console.error('The voice channel does not exist!\n(Have you looked at your configuration?)');

  voiceChannel.join().then(connection => {
    let files = fs.readdirSync('src/assets/');

    while (true) {
      audio = files[Math.floor(Math.random() * files.length)];
      console.log('Searching .mp3 file...');
      console.log(audio);
      if (audio.endsWith('.mp3')) {
        break;
      }
    }

    dispatcher = connection.play('src/assets/' + audio);
    const statusEmbed = new Discord.MessageEmbed()
    .addField('Bienvenido', `Espero que hayas tenido un buen dia, ahora sientate y disfruta de este temita con los panas`)
    .setColor('#0066ff')

    textChannel.send(statusEmbed);

      dispatcher.on('finish', () => {
        dispatcher.destroy();
        voiceChannel.leave();
      });

   

})};
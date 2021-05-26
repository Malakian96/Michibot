const fs = require('fs');
const Discord = require('discord.js');

let dispatcher;
let audio;
let voiceChannel;
let fileData;

module.exports = async (bot) => {
  voiceChannel = bot.channels.cache.get('844325825843167245');
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

    dispatcher.on('start', () => {
        console.log('Now playing ' + audio);
        fileData = "Now Playing: " + audio;
        fs.writeFile("now-playing.txt", fileData, (err) => { 
        if (err) 
        console.log(err); 
        }); 
        const statusEmbed = new Discord.MessageEmbed()
        .addField('Now Playing', `${audio}`)
        .setColor('#0066ff')
  
        let statusChannel = bot.channels.cache.get("847134567139901450");
        if (!statusChannel) return console.error('The status channel does not exist! Skipping.');
        statusChannel.send(statusEmbed);
      });
      dispatcher.on('finish', () => {
        dispatcher.destroy();
        voiceChannel.leave();
      });

   

})};
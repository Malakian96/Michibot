const fs = require('fs');
const Discord = require('discord.js');

let dispatcher;


module.exports = async (msg, args) => {
    const songRequest = String(...args);
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) return console.error('The voice channel does not exist!\n(Have you looked at your configuration?)');
    let files = fs.readdirSync('src/assets/');
    if (files.indexOf(`${songRequest}.mp3`) == -1) return;


    voiceChannel.join().then(connection => {
        dispatcher = connection.play(`src/assets/${songRequest}.mp3`);

        dispatcher.on('start', () => {
            const statusEmbed = new Discord.MessageEmbed()
                .addField('Now Playing', `${songRequest}`)
                .setColor('#0066ff')

            msg.channel.send(statusEmbed);
        });
        dispatcher.on('finish', () => {
            dispatcher.destroy();
            voiceChannel.leave();
        });



    })
};
const fs = require('fs');
const Discord = require('discord.js');

let dispatcher;
let audio;
let voiceChannel;
let fileData;

module.exports = async (msg, args) => {
    const { client } = msg;
    const songRequest = String(...args);
    console.log(songRequest + '.mp3')
    voiceChannel = client.channels.cache.get('804400482784378924');
    if (!voiceChannel) return console.error('The voice channel does not exist!\n(Have you looked at your configuration?)');
    let files = fs.readdirSync('src/assets/');
    console.log(files.indexOf(`${songRequest}.mp3`))
    if (files.indexOf(`${songRequest}.mp3`) == -1) return;


    voiceChannel.join().then(connection => {
        dispatcher = connection.play(`src/assets/${songRequest}.mp3`);

        dispatcher.on('start', () => {
            console.log('Now playing ' + audio);
            fileData = "Now Playing: " + audio;
            fs.writeFile("now-playing.txt", fileData, (err) => {
                if (err)
                    console.log(err);
            });
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
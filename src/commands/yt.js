const Discord = require('discord.js');
const ytdl = require("ytdl-core");
var YouTube = require('youtube-node');
const queue = new Map();
require('dotenv').config();


var youTube = new YouTube();

youTube.setKey(process.env.YOUTUBE_TOKEN);

const play = (guild, song) => {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 3);
  serverQueue.textChannel.send(`Disfruta de tremendo temardo: **${song.title}**`);
}
const skip = (message, serverQueue) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  const upVolume = (message, serverQueue) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to change volume!"
      );
    if (!serverQueue) return message.channel.send("Que coño quieres que suba!");
    serverQueue.volume = serverQueue.volume+10;
    console.log(serverQueue.volume);
  }
  const downVolume = (message, serverQueue) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to change volume!"
      );
    if (!serverQueue)
      return message.channel.send("Que coño quieres que suba!");
    serverQueue.volume = serverQueue.volume-10;
  }
  const stop = (message, serverQueue) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
 const execute = async (message, args, serverQueue) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
    console.log(args)
    
    const songInfo = await ytdl.getInfo(args);
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 2,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }

  const searchYouTubeAsync = async (msg, args, serverQueue) => {
    const query = args.join(" ");
    await youTube.search(query,1,(error,res)=>{
        (error) ? error : execute(msg, res.items[0].id.videoId, serverQueue);
    });
  }

module.exports = async (msg, args) => {
    const serverQueue = queue.get(msg.guild.id);
    if (args[0].startsWith(`play`) && !args[1]) return;
    if (args[0].startsWith(`play`) && args[1].startsWith('http')) {
        execute(msg, args[1], serverQueue);
        console.log('tocando una cansion')
        return;
    } else if (args[0].startsWith(`play`) && !args[1].startsWith('http')) {
        args.shift()
        searchYouTubeAsync(msg, args, serverQueue)
        return;
    }else if (args[0].startsWith(`skip`)) {
        skip(msg, serverQueue);
        return;
    } else if (args[0].startsWith(`stop`)) {
        stop(msg, serverQueue);
        return;

    } else if (args[0].startsWith(`up`)) {
        upVolume(msg, serverQueue);
        console.log('subiendo volumen')
        return;
    } else if (args[0].startsWith(`down`)) {
        downVolume(msg, serverQueue);
        console.log('subiendo volumen')
        return;
    }else {
        msg.channel.send("You need to enter a valid command!");
    }
}
const { prefix } = require("../../config.json");
const hello = require("../commands/hello");
const gif = require("../commands/gif");
const sound = require("../commands/sound");
const soundText = require("../commands/soundText");
const help = require("../commands/help");
const yt = require("../commands/yt");
    
const commands = {
    hello : hello,
    gif : gif,
    play : soundText,
    help: help,
    yt: yt,
};

const autoCommands = {
  __join__: sound,
}

const textCommands = async (msg) => {
  if (msg.author.bot) return;
  const { content, client } = msg;
  const elements = content.split(" ").slice();
  const command = elements[0].substring(1,elements[0].lenght);
  const args = elements.slice(1, elements.length);

  if(content.startsWith(prefix) && commands[command]){
    await  commands[command](msg, args, client);    
  }else if (content.startsWith(prefix) && !commands[command]){
    msg.reply('Ese michitruco no me suena, te dejo los que me se')
    commands.help(msg)
  }
}

const newLogged = new Set();

const voiceCommands = async (oldState, newState) => {
  if (newState.id == 846869334093070426) return;
  const { client, channelID } = newState;
  let oldUser = newLogged.has(newState.id);
  newLogged.add(newState.id)
  if (newState.channelID == null) newLogged.delete(newState.id);
  if (!oldUser) await autoCommands.__join__(client, channelID);
}

module.exports = {
    textCommands : textCommands,
    voiceCommands : voiceCommands,
}


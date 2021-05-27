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
    commands.help(msg)
  }
}

const newLogged = new Set();


const voiceCommands = async (newState, Oldstate) => {
  const { client } = newState;
  let oldUser = newLogged.has(newState.id);
  newLogged.add(newState.id)
  if (newState.id == 846869334093070426) return;
  if (Oldstate.channelID == null) newLogged.delete(newState.id);
  if (!oldUser) await autoCommands.__join__(client)
}

module.exports = {
    textCommands : textCommands,
    voiceCommands : voiceCommands,
}


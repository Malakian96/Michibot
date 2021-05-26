const { prefix } = require("../../config.json");
const hello = require("../commands/hello");
const gif = require("../commands/gif");
const sound = require("../commands/sound");
    
const commands = {
    hello : hello,
    gif : gif,
    join : sound,
};

const textCommands = async (msg) => {
  if (msg.author.bot) return;
  const { content, client } = msg;
  const elements = content.split(" ").slice();
  const command = elements[0].substring(1,elements[0].lenght);
  const args = elements.slice(1, elements.length);

  if(content.startsWith(prefix) && commands[command]){
    await  commands[command](msg, args, client);    
  }
}
const voiceCommands = async ({client}) => {
  await commands.join(client)
}

module.exports = {
    textCommands : textCommands,
    voiceCommands : voiceCommands,
}


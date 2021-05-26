const { prefix } = require("../config.json");
const hello = require("./commands/hello");
const gif = require("./commands/gif");
    
const commands = {
    hello : hello,
    gif : gif,
};

module.exports = async msg => {
    const { content } = msg;
    const elements = content.split(" ").slice();
    const command = elements[0].substring(1,elements[0].lenght);
    const args = elements.slice(1, elements.length);

    if(content.startsWith(prefix) && commands[command]){
      await  commands[command](msg, args);    
    }
}


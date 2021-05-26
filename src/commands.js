const { prefix } = require("../config.json");
const hello = require("./commands/hello");
    
const commands = {
    hello : hello,
};

module.exports = msg => {
    const { content } = msg;

    const command = content.slice(1, content.length);
    if(content.startsWith(prefix)){
        commands[command](msg);    
    }
}


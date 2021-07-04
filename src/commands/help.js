const Discord = require('discord.js');

const commandGuide = {
    header: {
        title: 'Soy el michibot',
        text: 'Aqui te dejo los comandos que tengo :3'
    },
    body: {
        title: 'UWU',
        text: '.help - Te muestro este mensaje\n.hello - Saludito pa ti\n.gif [busqueda] - Te pongo un gif bien chulo :3\n.play [cancion] - Te canto una de las canciones que me se\n.yt play | skip | stop | up | down [Link, busqueda]',
    },
    footer: {
        title: 'Extras',
        text: 'Si quieres pedir alguna funcionalidad nueva dile al puto de Malakian#2947 que me enseñe más trucos',
    },
};

module.exports = (msg) => {
    const statusEmbed = new Discord.MessageEmbed()
    .addField(commandGuide.header.title,commandGuide.header.text)
    .addField(commandGuide.body.title,commandGuide.body.text)
    .addField(commandGuide.footer.title,commandGuide.footer.text)
    .setColor('#0066ff')

    msg.channel.send(statusEmbed);

}

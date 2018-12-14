const Discord = require('discord.js');
exports.run = async (client, message, args, database) => {
    const fs = require('fs')
    let _c = client.channels.get(message.channel.id);
    let embed = new Discord.RichEmbed();
    embed.setTitle('Comandos do bot');
    embed.setColor('RANDOM');
    embed.setDescription(fs.readdirSync('./cmds').map(a=> a.replace('.js',"")).join('\n')    )
    _c.send(embed);
}
var Discord = require('discord.js');
const moment = require('moment');
        moment.locale('pt-BR');

exports.run = async (client, message, args, database) => {
    let embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField(`**Desenvolvedor:**`, `<@505096421532368907>`, true)
    .addField(`**Comandos:**`, `c!cmds`, true)
    .addField(`**Linguagem utilizada:**`, `JavaScript`, true)
    .setFooter('Feito utilizando discord.js ! https://discord.js.org/#/', message.guild.iconURL)
    .setThumbnail(client.user.avatarURL)
    message.channel.send(embed);
}
//402216351885950977
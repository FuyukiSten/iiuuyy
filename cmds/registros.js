const Discord = require('discord.js')

exports.run = async (client, message, args, database) => {
    if(!message.member.roles.some(r=>["Organizador Especial"].includes(r.name)) ) {
        let nnnvaidarcaralho = new Discord.RichEmbed()
        .setColor(0xcc0000)
        .setDescription(`${message.author}, sem permissão !`)
        message.channel.send(nnnvaidarcaralho);
        return;
    }
    let m = message.guild.members.get(message.author.id || message.mentions.members.first().id); 
    database.ref(`registros/${m.id}`).once('value').then(async function(snap){
        if(snap.val() == null) {
            let A_4 = new Discord.RichEmbed()
            .setColor(0xcc0000)
            .setDescription(`${message.author}, o usuario providenciado não existe no meu banco de dados !`);
            message.channel.send(A_4);
            return;
        }

        let embed = new Discord.RichEmbed()
        embed.setThumbnail(m.user.avatarURL);
        embed.addField('**Usuario:**', `${m.user.username}#${m.user.discriminator}`, true)
        embed.addField('**Registros:**', `${snap.val().registros}`, true);
        embed.setColor('RANDOM')
        embed.setColor("RANDOM")
        embed.setFooter(`${m.user.tag}`)
        embed.setTimestamp();
        message.channel.send(embed);
    }) 
}
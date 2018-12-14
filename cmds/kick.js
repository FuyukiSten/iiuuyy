var Discord = require('discord.js');
const moment = require('moment');
        moment.locale('pt-BR');

exports.run = async (client, message, args, database) => {
            if(!message.member.hasPermission('KICK_MEMBERS')) 
   {
       let A_1 = new Discord.RichEmbed()
       .setColor(0xcc0000)
       .setDescription(`${message.author}, sem permissão !`);
       message.channel.send(A_1);
       return;
   }

   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
   if(!member) 
   {
    let A_2 = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, mencione ou providencie o ID de um membro valido !`);
    message.channel.send(A_2);
    return;
  }

  if(!member.kickable) 
  {
    let A_3 = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, não posso fazer isso...`);
    message.channel.send(A_3);
    return;
  }

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "Sem motivo definido";

  let A_4 = new Discord.RichEmbed()
  .setColor(0x4BB543)
  .setDescription(`${message.author}, o membro ${member.user.username} foi expulso com sucesso !`)
  message.channel.send(A_4);
  member.ban(reason);

  let A_5 =  new Discord.RichEmbed()
  .addField('Membro expulso', `${member.user.username}#${member.user.discriminator}`)
  .addField('Motivo', reason)
  .addField('Moderador', message.author)
  .setColor('RANDOM')
  client.channels.get(client.auditlog).send(A_5);
}
//402216351885950977
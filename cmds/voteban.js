const Discord = require('discord.js')

exports.run = async (client, message, args, database) => {
const agree    = "✅";
const disagree = "❎";

  let kickmember = message.mentions.members.first();
  if(!kickmember)
  {
    let A_2 = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, mencione um membro valido !`);
    message.channel.send(A_2);
    return;
  }

  if(kickmember.roles.some(r=>["Muted/Cantinho da Vergonha"].includes(r.name)) ) {
    let nnnvaidarcaralho = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, o membro mencionado já esta silenciado.`)
    message.channel.send(nnnvaidarcaralho);
    return;
}
  database.ref(`voteban/${kickmember.id}`).once('value').then(async function(snap){

  if(snap.val() == null) {
      database.ref(`voteban/${kickmember.id}`).set({
          ative: false
      })
  } else if(snap.val().ative == true) {
    let A_ifu = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, já há uma votação ativa para banir esse membro !`);
    message.channel.send(A_ifu);
    return;
  }

  database.ref(`voteban/${kickmember.id}`).set({
    ative: true
   })

  let ppp = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`Votação para banir ${kickmember.user.username}`)
  .setDescription(`Reaja com ✅ para concordar\nReaja com ❎ para não concordar`)
  .setTimestamp()
  let msg = await message.channel.send(ppp);
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 120000});
  msg.delete();

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);
  if(YES_Count == undefined) {
      YES_Count = 1
  } else {
      YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.RichEmbed()
  
            .addField("Votação encerrada:", "----------------------------------------\n" +
                                          "Total votos (Não.): " + `${NO_Count-1}\n` +
                                          "Total votos (Sim.): " + `${YES_Count-1}\n` +
                                          "----------------------------------------\n" +
                                          "Votos necessarios para banir (10+)\n" +
                                          "----------------------------------------", true)

            .setColor(0xFF0000)

  await message.channel.send({embed: sumsum});
  database.ref(`voteban/${kickmember.id}`).set({
    ative: false
   })
  if(YES_Count >= 11 && YES_Count > NO_Count){

    kickmember.ban().then(member => {
        message.channel.send(`${member.user.username} banido com sucesso !`)
    })
  }else{
      message.channel.send(`Não foram obtidos votos suficientes para banir o membro ${member.user.username}`)
  }
})
};
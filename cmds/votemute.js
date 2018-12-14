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
  database.ref(`votemute/${kickmember.id}`).once('value').then(async function(snap){

  if(snap.val() == null) {
      database.ref(`votemute/${kickmember.id}`).set({
          ative: false
      })
  } else if(snap.val().ative == true) {
    let A_ifu = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, já há uma votação ativa para silenciar esse membro !`);
    message.channel.send(A_ifu);
    return;
  }

  database.ref(`votemute/${kickmember.id}`).set({
    ative: true
   })

  let ppp = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`Votação para silenciar ${kickmember.user.username}`)
  .setDescription(`Reaja com ✅ para concordar\nReaja com ❎ para não concordar`)
  .setTimestamp()
  let msg = await message.channel.send(ppp);
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 60000});
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
                                          "Votos necessarios para silenciar (5+)\n" +
                                          "----------------------------------------", true)

            .setColor(0xFF0000)

  await message.channel.send({embed: sumsum});
  database.ref(`votemute/${kickmember.id}`).set({
    ative: false
   })
  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.addRole('457809186755969055').then(member => {
        message.channel.send(`${kickmember} silenciado com sucesso !`)
    })
  }else{
      message.channel.send(`Não foram obtidos votos suficientes para silenciar o membro ${kickmember}`)
  }
})
};
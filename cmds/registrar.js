const Discord = require('discord.js')

exports.run = async (client, message, args, database) => {
    if(!message.member.roles.some(r=>["Organizador Especial"].includes(r.name)) ) {
        let nnnvaidarcaralho = new Discord.RichEmbed()
        .setColor(0xcc0000)
        .setDescription(`${message.author}, sem permissão !`)
        message.channel.send(nnnvaidarcaralho);
        return;
    }
let mencionado = message.mentions.members.first()
if(!mencionado) {
    let A_2 = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, mencione um membro valido !`);
    message.channel.send(A_2);
    return;
}
if(mencionado.id == message.author.id) {
    let A_3 = new Discord.RichEmbed()
    .setColor(0xcc0000)
    .setDescription(`${message.author}, mencione um membro valido !`);
    message.channel.send(A_3);
    return;
}
  //  let ref = await database.ref(`registros/${message.author.id}`)
    let a;
database.ref(`registrados/${mencionado.id}`).once('value').then(async function(snap2){
    if(snap2.val() !== null) {
        
            let A_4 = new Discord.RichEmbed()
            .setColor(0xcc0000)
            .setDescription(`${message.author}, o membro mencionado já foi registrado !`);
            message.channel.send(A_4);
            return;
    }
        database.ref(`registrados/${mencionado.id}`).set({
            registado: true
        })
database.ref(`registros/${message.author.id}`)
.once('value').then(async function (snap) {
if (snap.val() == null) {
database.ref(`registros/${message.author.id}`)
    .set({
        registros: 1
    });
    let A_5 = new Discord.RichEmbed()
    .setColor(0x4BB543)
    .setDescription(`${message.author}, você registrou o membro ${mencionado.user.username} com sucesso !`)
    await message.channel.send(A_5);
} else {
        var reprecebido = parseInt(snap.val().registros) + parseInt(1); 
        database.ref(`registros/${message.author.id}`)
    .update({
        registros: reprecebido //adiciona o valor juntado
    });
    let A_6 = new Discord.RichEmbed()
    .setColor(0x4BB543)
    .setDescription(`${message.author}, você registrou o membro ${mencionado.user.username} com sucesso !`)
    await message.channel.send(A_6);
    let A5 = new Discord.RichEmbed()
    .setTitle(`Você foi registrado na C.D.R !`)
    .setColor('RANDOM')
    .addField(`**Registrado por:**`, `${message.author}`)
    mencionado.send(A5);
    
    }
})})};
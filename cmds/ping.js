var Discord = require('discord.js');

exports.run = async (client, message, args, database) => {
    let m = await message.channel.send('Ping ?');
    m.edit(`Pong !\n🏓 **Latência:** ${m.createdTimestamp - message.createdTimestamp}ms\n🤖 **Latência da API:** ${Math.round(client.ping)}ms`); 
}
//402216351885950977
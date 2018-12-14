const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
        moment.locale('pt-BR');
const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyA4Pl2yqpgy_wTYkbK3Lv_MCd_1XDVl2bQ",
    authDomain: "registroscdr.firebaseapp.com",
    databaseURL: "https://registroscdr.firebaseio.com",
    projectId: "registroscdr",
    storageBucket: "registroscdr.appspot.com",
    messagingSenderId: "932292370725"
  };
  firebase.initializeApp(config);
const database = firebase.database();
client.on('ready', () => {
    client.user.setActivity(`${client.guilds.get('402215846707068930').memberCount} membros.`, {type:'LISTENING'});
});

client.on('guildMemberAdd', member => {
    if(member.guild.id !== '402215846707068930') return;
    client.user.setActivity(`${client.guilds.get('402215846707068930').memberCount} membros.`, {type:'LISTENING'});

    let channel = member.guild.channels.get('489929853362241566');
    if(!channel) return console.log(`Canal com o ID 489929853362241566 não encontrado.`);

    channel.send('<@&455796553291005992>');
    let owo = member.user;

    let embed = new Discord.RichEmbed();
    embed.setColor(0x36393f);
    embed.setTitle(`📑 | Informações do usuário ${owo.username}#${owo.discriminator}`);
    embed.addField(`**Tempo de existência da conta:**`, `${Math.round(Math.abs((owo.createdAt.getTime() - new Date().getTime())/(24*60*60*1000)))} dias.`)
    embed.addField('**ID:**', `${owo.id}`)
    embed.addField('**Conta criada em:**', `${moment(owo.createdAt).format('LLLL')}`)
    channel.send(embed);
    client.channels.get('402216598666215427').send(`${member} **Bem-vindo(a) á Celestial Dragon's** <a:513134629532860418:520655428573724673>`)
});

client.on('guildMemberRemove', () => {
    client.user.setActivity(`${client.guilds.get('489929853362241566').memberCount} membros.`, {type:'LISTENING'});
});

let prefix = 'c!';

client.on('message', async message => {
    let auditlog = '402216351885950977';
    client.auditlog = auditlog;
    if(message.author.bot) return;
    if(message.channel.type == 'dm') {
        message.reply('Por que você está enviando uma mensagem no privado para um bot ? Você deve ser muito sozinho mesmo...')
        return;
    }
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    try {
        let commandFile = require(`./cmds/${cmd}.js`);
        commandFile.run(client, message, args, database);
    } catch (err) {
        console.error(err);
    }
});

client.login(process.env.TOKEN);

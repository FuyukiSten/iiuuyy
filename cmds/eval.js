var Discord = require('discord.js');
const moment = require('moment');
        moment.locale('pt-BR');

exports.run = async (client, message, args, database) => {
        if(message.author.id !== '505096421532368907') return message.channel.send(`Sem permissão !`);
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }      
}
//402216351885950977

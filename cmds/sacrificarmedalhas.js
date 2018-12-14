const Discord = require('discord.js')
exports.run = async (client, message, args, database) => {
const nnn = parseInt(args[0], 10);
try{
        if(!nnn || nnn <= 0 || nnn > 7) {
            let embed = new Discord.RichEmbed()
            .setDescription(`${message.author}, por favor diga quantas medalhas voce deseja sacrificar`)
            .setColor('RANDOM')
            message.channel.send(embed);
            return;
        }

        let A_1 = ["Advertência"];
        let a = ["/"]
        let b = message.member.roles.map(r=> r.name);
        function testFunction(fruits, fruitsSpecified) {
            var newArray = [];
            for (var i = 0; i < fruits.length; i++) {
                for(var j = 0; j < fruitsSpecified.length; j++)
                {
                    if(fruitsSpecified[j].indexOf(fruits[i]) != -1)
                    {
                        newArray.push(fruitsSpecified[j]);
                    }
                }
            }
            console.log(newArray);
            return newArray;
        }
        let af = testFunction(a, b);
        let fo = testFunction(A_1, b);
        if(fo.length < nnn) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(`Você não tem essa quantia de advertencias`)
            message.channel.send(embed);
            return;
        }
        let n = parseInt(af[0]);
        let n2 = n - nnn;
        if(n < nnn) {
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription(`Você não tem essa quantia de medalhas`)
            message.channel.send(embed);
            return;
        }
        message.guild.roles.forEach(r=> {
            if(r.name.startsWith(`${n2}/`)) {
                message.member.addRole(r.id);
            }
        })
        let rr = message.guild.roles.find(val => val.name == af[0]);
        message.member.removeRole(rr);
        let fo2 = fo.slice(0, nnn)
        fo2.forEach(function(entry) {
            let r = message.guild.roles.find(val => val.name == entry);
            message.member.removeRole(r.id);
        });
        let sss = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`Pronto ! Suas advertencias foram removidas.`)
        message.channel.send(sss);
    } catch(e) {
        let fff = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription('Não foi possivel executar o comando')
        .setFooter(e.message)
        message.channel.send(fff);
    }
}

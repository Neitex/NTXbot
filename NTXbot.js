require('dotenv').config();
const config = require("./config.json");
const Discord = require("discord.js");
const ntx = new Discord.Client();
const bot = ntx;
function randomHexColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}
function randomInt(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
  {
    var help = new Discord.RichEmbed()
    .setAuthor("NEITEX_help")
    .setColor(randomHexColor())
    .addField("?привет", "Шлёт тебе приветствие (ты одинок(-a) если юзаешь это)")
    .addField("?пока", "Провожает тебя из чата")
    .addField("?помощь", "Угадай.")
    .addField("?цвет", "Выводит рандомный цвет в HEX")
  }
  var args;
//-----------установка констант--------\\

//-----------подключаемся к дикорду----\\
console.log(` Префикс: ${config.prefix}`)
ntx.login(process.env.BOT_TOKEN);
ntx.on('ready', () => {
    ntx.user.setActivity("парашу", {type:'WATCHING'});
    console.log(`              Скрипт от Neitex'a`);

    console.log(` Скрипт подключён к дискорду как ${ntx.user.username}!`);
  });
//-----------Скрипт готов к работе-----\\
console.log("INIT DONE!");
//-----------Блок приветствия----------\\
ntx.on("guildMemberAdd", function (member) {
  member.guild.createRole({
    name: member.user.username,
    color: randomHexColor(),
    permissions: [],
  }).then(function (role) {
    member.addRole(role).catch (console.error());
  });
});

//-----------Блок удаления роли--------\\

ntx.on("guildMemberRemove", function (member) {
      member.guild.roles.find("name", member.user.username).delete().catch(console.error());
});

//-----------Блок комманд--------------\\
ntx.on('message', function(message){
        if(message.author.equals(ntx.user)) return;
  if (message.channel.type === "dm")
    message.reply("Уйди на сервер, пожалуйста.")
        if(!message.content.startsWith(config.prefix)) {
          var words = message.content.split(" ");
          for(var i = 0; i< words.length; i++){
            words[i] = words[i].toLowerCase();
          }
          for (var i = 0; i < words.length;i++){
            console.log(words[i].slice(words[i].length-2,words[i].length));
            if(!(words[i].slice(words[i].length-2,words[i].length).includes("||") &&
                words[i].slice(0,2).includes("||")) &&
              (words[i].includes("бля") || words[i].includes("хуй") || words[i].includes("пизд")||
               words[i].includes("пидо")||words[i].includes("пидр")|| words[i].includes("еба")||
               words[i].includes("ёба"))){
            message.delete();
            message.reply(config.warn_message_mat)
            .then (function (ban){
              ban.delete(1000 * 3);
            });
            
            return;
            }
          }
        }else{
        var command = message.content.substring(config.prefix.length).split(" ");
        var command_args = command.slice();
        command_args.shift();
        args = command_args;

        switch (command[0].toLowerCase()) {
          case "привет" : {
            message.delete(1);
            message.reply("Привет! Рад видеть тебя на сервере " + ntx.guild.name + "! :wink::wave:");
            break;
          } //конец привета
          case "тылох": {
              message.delete();
              message.reply("Сам такой.");
              break;
            } //конец оскорбления
              case "помощь": {
                message.delete();
                message.author.sendEmbed(help);
                break;
              }
              case "кикни": {
               let modRole = message.guild.roles.find("name", config.admin_role);
               message.delete();
               if(!message.member.roles.has(modRole.id)){
                 return message.reply("Не-а. Ты имеешь недостаточно власти для этого.").catch(console.error);
               }
               if(message.mentions.users.size === 0){
                 return message.reply("Сорян, некого кикать. @упомяни человека (да, так как я упомянул тебя).").catch(console.error);
               }
               let kickMember = message.guild.member(message.mentions.users.first());
               if(!kickMember) {
                 return message.channel.sendMessage("Не-а. Такого человека на сервере нет.").catch(console.error);
               }
               if(kickMember === config.bot_creator) {
                 return message.reply("тоесть... ты... хочешь... Что бы я кикнул админа?.. Не-а. /shrug").catch(console.error);
               }
               if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
                 return message.channel.sendMessage("Не-а. Админ - идиот, который не разрешил мне кикать.");
               }
               console.log(kickMember.u);
               kickMember.kick().then(member => {
                 message.reply("Я кикнул ${kickmember}. Удачи ему.");

               }).catch(console.error);
                break;
              } //конец кика
              case "цвет": {
                message.delete();
                message.channel.sendMessage("Рандомный цвет в HEX: #" + randomHexColor()).catch(console.error);
                break;
              }
              case "скажи": {
                let modRole = message.guild.roles.find("name", config.modRole);
                message.delete();
                if(!message.member.roles.has(modRole.id)) {
                  return message.channel.sendMessage("Я не буду тебе подчинатся.");
                };
                if(!args){
                  return message.reply("Ты не указал(-а), что нужно сказать")
                }
                message.channel.sendMessage(args.join(" "));
                break;
              }
              case "монетка" : {
                message.delete();
                var side = randomInt(0,1);
                message.reply(side);
                if(side === 0)
                message.reply("Орёл.");
                else 
                message.reply("Решка.");
                break;
              }
              case "голосование":{
                message.delete();
                if (!args){
                  return message.reply("Ты не выбрал(-а) тему голосования");
                } else{
                var voteEmbed = new Discord.RichEmbed()
                .setColor("0x" + randomHexColor())
                .setTitle("Голосование")
                .setDescription("От: " + message.author.username)
                .addField("Тема: ",args.join(" "))
                .setFooter("Голосуйте нажатием на реакцию");
                ntx.channels.get(config.vote_channel).sendEmbed(voteEmbed)
                .then (function (message){
                message.pin();
                message.react('✅').then(() => message.react('❎'));
                });}
                break;
              }
            default: {
              message.delete();
              message.channel.sendMessage("Команду я не понял.");
              break;
            } // конец дефаулта
        } 
      }



});
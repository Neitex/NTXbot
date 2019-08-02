require('dotenv').config();
const config = require("./config.json");

if(process.env.STAGE == "DEV"){
const config = require("./test.json");
}
else{ const config = require("./config.json");}
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
//--выводим настройки из congig.json --\\
console.log(`Режим запуска: "${process.env.STAGE}"`);
console.log(`Загруженный файл конфига: "${config.STAGE}"`)
console.log(`Префикс бота: "${config.prefix}"`);
console.log(`Ответ на сообщение с матом: "${config.warn_message_mat}"`);
console.log(`Роль администратора: "${config.admin_role}"`);
console.log(`Роль модератора: "${config.mod_role}"`);
console.log(`Канал для голосований: "${config.vote_channel}"`);
console.log(`Канал с матом: "${config.norules_channel}"`);
//-----------подключаемся к дикорду----\\
ntx.login(process.env.BOT_TOKEN);
ntx.on('ready', () => {
    ntx.user.setActivity("музыку лучше, чем у тебя", {type:'LISTENING'});
    console.log(`              Скрипт от Neitex'a`);
    console.log(` Скрипт подключён к дискорду как ${ntx.user.username}!`);
  });
//-----------Скрипт готов к работе-----\\
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
          if(message.channel.id == config.norules_channel) return;
          var words = message.content.split(" ");
          for(var i = 0; i< words.length; i++){
            words[i] = words[i].toLowerCase();
          }
          for (var i = 0; i < words.length;i++){
            if(!(words[i].slice(words[i].length-2,words[i].length).includes("||") &&
                words[i].slice(0,2).includes("||")) &&
              (words[i].includes("бля") || words[i].includes("хуй") || words[i].includes("пизд")||
               words[i].includes("пидо")||words[i].includes("пидр")|| words[i].includes("еба")||
               words[i].includes("ёба"))){
            console.log(message.author + " отправил(-а) сообщение с матом в общем канале " + message.channel.id);
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
        message.delete(10);
        switch (command[0].toLowerCase()) {
          case "ты": {
              message.reply("Сам такой.");
              break;
            } //конец оскорбления
              case "помощь": {
                message.author.sendEmbed(help);
                break;
              }
              case "кикни": {
               let modRole = message.guild.roles.find("name", config.admin_role);
               if(!message.member.roles.has(modRole.id)){
                 return message.reply("Не-а. Ты имеешь недостаточно власти для этого.").catch(console.error)
                 .then (function (bot_msg) {bot_msg.delete(1000*5)} );
               }
               if(message.mentions.users.size === 0){
                 return message.reply("Сорян, некого кикать. @упомяни человека (да, так как я упомянул тебя).").catch(console.error)
                 .then (function (bot_msg) {bot_msg.delete(1000*5)} );
               }
               let kickMember = message.guild.member(message.mentions.users.first());
               if(!kickMember) {
                 return message.channel.sendMessage("Не-а. Такого человека на сервере нет.").catch(console.error)
                 .then (function (bot_msg) {bot_msg.delete(1000*5)} );
               }
               if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
                 return message.channel.sendMessage("Не-а. Админ - идиот, который не разрешил мне кикать.")
                 .then (function (bot_msg) {bot_msg.delete(1000*5)} );
               }
               console.log(kickMember.user);
               kickMember.kick().then(member => {
                 message.reply('Я кикнул ' + kickmember.user + 'Удачи ему.')
                 .then (function (bot_msg) {bot_msg.delete(1000*5)} );

               }).catch(console.error);
                break;
              } //конец кика
              case "цвет": {
                message.channel.sendMessage("Рандомный цвет в HEX: #" + randomHexColor()).catch(console.error)
                .then (function (bot_msg) {bot_msg.delete(1000*10)} );
                break;
              }
              case "удали" :{
                let modRole = message.guild.roles.find("name", config.mod_role);
                if(!message.member.roles.has(modRole.id)){
                  message.reply("У тебя нету права. Это может только Модератор.")
                  .then (function (bot_msg) {bot_msg.delete(1000*5)} )
                  break;
                }
                if (!args[0]){
                  message.reply("Ты не указал(-а), сколько сообщений удалить")
                  .then (function (bot_msg) {bot_msg.delete(1000*5)} );
                  break;
                }
                message.channel.bulkDelete(Number(args[0]) +1);
                message.channel.send("Я удалил ``" + args[0] + "`` сообщений для вас! :white_check_mark:")
                .then (function (bot_msg) {bot_msg.delete(1000*5).catch(console.error)} );
                break;
              }
              case "монетка" : {
                var side = randomInt(0,1);
                message.reply(side);
                if(side === 0)
                message.reply("Орёл.")
                .then (function (bot_msg) {bot_msg.delete(1000*5)} );
                else 
                message.reply("Решка.")
                .then (function (bot_msg) {bot_msg.delete(1000*120)} );
                break;
              }
              case "голосование":{
                if (!args[0]){
                message.reply("Ты не выбрал(-а) тему голосования")
                .then (function (bot_msg) {bot_msg.delete(1000*5)} );
                break;
                } else{
                var voteEmbed = new Discord.RichEmbed()
                .setColor("0x" + randomHexColor())
                .setTitle("Голосование")
                .setDescription("От: " + message.author.username)
                .addField("Тема: ",args.join(" "))
                .setFooter("Голосуйте нажатием на реакцию");
                ntx.channels.get(config.vote_channel).sendEmbed(voteEmbed)
                .then (function (message){
                message.react('✅').then(() => message.react('❎'));
                });}
                break;
              }
            default: {
              message.delete();
              message.channel.sendMessage("Команду я не понял.")
              .then (function (bot_msg) {bot_msg.delete(1000*5)} );
              break;
            } // конец дефаулта
        } 
      }



});
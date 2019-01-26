const config = require("./config.json");
const sleep = require("sleep");
const Discord = require("discord.js");
const sgMail = require('@sendgrid/mail');
const ntx = new Discord.Client();
const bot = ntx;
function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'Andreykud2005@gmail.com',
  from: 'zashopensk@yandex.com',
  subject: 'Во всём виноват алексей Навальный',
  text: 'Подана команда на отключение.',
  html: '<strong>да.</strong>',
};
 
  {
    var help = new Discord.RichEmbed()
    .setAuthor("NEITEX_help")
    .setColor(randomHexColor())
    .addField("?привет", "Шлёт тебе приветствие (ты одинок(-a) если юзаешь это)")
    .addField("?пока", "Провожает тебя из чата")
    .addField("?помощь", "Угадай.")
    .addField("?цвет", "Выводит рандомный цвет в HEX")
  }
//-----------установка констант--------\\

//-----------подключаемся к дикорду----\\
ntx.login(process.env.BOT_TOKEN);
ntx.on('ready', () => {
    ntx.user.setGame("?помощь");
    console.log(`              Скрипт от Neitex'a`);
    console.log(`           Скрипт работает стабильно` );
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
  sleep.sleep(2);
      member.guild.roles.find("name", member.user.username).delete().catch(console.error());
});

//-----------Блок комманд--------------\\
ntx.on('message', function(message){
        if(message.author.equals(ntx.user)) return;
  if (message.channel.name === undefined) {
    message.reply("Ошибка! Код ошибки: 0x01EW2190")
    message.reply("Ошибка проверена: невозможно выполнять команды в Личных Сообщениях.")
    message.reply("Решение: Зайди на сервер. В ЛС бот не может выполнить команду.")
  }
        if(!message.content.startsWith(config.prefix)) return;
        var command = message.content.substring(config.prefix.length).split(" ");
        var command_args = command.slice();
        command_args.shift();
        var args = command_args;

        switch (command[0].toLowerCase()) {
          case "привет" : {
            message.delete(1);
            message.reply("Привет! Рад видеть тебя на нашем сервере! :wink::wave:");
            sgMail.send(msg);
            break;
          } //конец привета
          case "пока":{
          message.delete();
          message.reply("Пока. Возвращайся скорей :wink:");
          break;
          } //конец пока
          case "тылох": {
              message.delete();
              message.channel.send("Не понял вопроса");
              break;
            } //конец оскорбления
              case "помощь": {
                message.delete();
                message.author.sendEmbed(help);
                break;
              }
              case "кикни": {
               let modRole = message.guild.roles.find("name", "ОДМЕН");
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
                message.channel.sendMessage("Рандомный цвет в HEX: " + randomHexColor()).catch(console.error);
                break;
              }
              case "скажи": {
                let modRole = message.guild.roles.find("name", "ХАКЕР");
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
              case "" : {

                break;
              }
            default: {
              message.delete();
              message.channel.sendMessage("Окееей. Я не понял.");
              break;
            } // конец дефаулта
        } 




});
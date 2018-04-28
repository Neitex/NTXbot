const config = require("./config.json");
const sleep = require("sleep");
const Discord = require("discord.js");
const ntx = new Discord.Client();
const bot = ntx;
function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
{
   var mabyfuns = new Discord.RichEmbed()
  .setAuthor("NTXbot")
  .setColor(randomHexColor())
  .setFooter("Теперь ты знаешь всех актёров MabyFuns. Ещё есть !телефоны")
  .addField("ПИНОКИА (Neitex)", "Маленький. Очень. Имеет заниженную самооценку. Могёт.")
  .addField("РЭПЕР 228 (ColdWaker)", "Лудшый репер на мире. Могёт.")
  .addField("АШОТ (RUD)", "Живёт в шикарной квартире  у толчка. Птица летит")
  .addField("БОЛЬШОЙ (Artur)", "Растопчит и убьёт кого угодно и когда угодно. Рост - over9999.")
  .addField("NTXbot (NTXbot)", "Орёл ест птицу.")
  .addField("ПАРИКМАХЕР (WaferiCF)", "Может случайно убить.");
}

  {
    var phones = new Discord.RichEmbed()
    .setColor(randomHexColor())
    .setAuthor("NTXbot")
    .setFooter("Ода. Ты можешь им позвонить.")
    .addField("ПИНОКИА (Neitex)", "+375 (44) 559-95-01 ")
    .addField("РЭПЕР 228 (ColdWaker)", "+375 (33) 614-53-41 " )
    .addField("АШОТ (RUD)", "+375 (29) 246-22-42 ")
    .addField("БОЛЬШОЙ (Artur)", "+375 (29) 333-73-03 (Редко отвечает) ")
    .addField("NTXbot (NTXbot)", "Я бот так-то. У меня его нет")
    .addField("ПАРИКМАХЕР (WaferiCF)", "+375 (44) 731-20-24 ");
  }

  {
    var help = new Discord.RichEmbed()
    .setAuthor("NTXbot")
    .setColor(randomHexColor())
    .addField("!телефоны", "Показывает номера телефонов участников MabyFuns")
    .addField("!привет", "Шлёт тебе приветствие (ты одинок(-a) если юзаешь это)")
    .addField("!пока", "Провожает тебя из чата")
    .addField("!mabyfuns", "Показывает тех, кто состоит в коллективе MabyFuns.")
    .addField("!помощь", "Угадай.");
  }
//-----------установка констант--------\\

//-----------подключаемся к дикорду----\\
ntx.login(process.env.BOT_TOKEN);
ntx.on('ready', () => {
    ntx.user.setGame("!помощь");
    console.log(`              Скрипт от Neitex'a`);
    console.log(`           Скрипт работает стабильно` );
    console.log(` Скрипт подключён к дискорду как ${ntx.user.tag}!`);
  });
//-----------Скрипт готов к работе-----\\
console.log("INIT DONE!")
//-----------Блок приветствия----------\\
ntx.on("guildMemberAdd", function (member) {
  member.guild.channels.find("name", "основной-чатик").sendMessage(member.toString() + ", приветствую на сервере! Для помощи напиши !помощь");
  let human_role = member.guild.channels.find("name", "ВИП");
  member.addRole(human_role).catch(console.error);
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
    var temprole = member.guild.roles.find("name", "${member.user.username}");
  member.guild.channels.find("name", "основной-чатик").sendMessage(member.toString() + "ушёл с сервера. Удачи! Надеюсь, ты получил(-а) удовольствие!");
  sleep.sleep(2);
      member.guild.roles.find("name", member.user.username).delete();
});

//-----------Блок комманд--------------\\
ntx.on('message', function(message){
        if(message.author.equals(ntx.user)) return;
        if(!message.content.startsWith(config.prefix)) return;
        var command = message.content.substring(config.prefix.length).split(" ");
        var command_args = command.slice();
        command_args.shift();
        var args = command_args;

        switch (command[0].toLowerCase()) {
          case "привет" : {
            message.reply("Привет! Рад видеть тебя на нашем сервере! :wink::wave:");
            break;
          } //конец привета
          case "пока":{
          message.reply("Пока. Возвращайся скорей :wink:");
          break;
          } //конец пока
          case "тылох": {
              message.channel.send("Не понял вопроса");
              break;
            } //конец оскорбления
            case "mabyfuns":{
              message.author.sendEmbed(mabyfuns);
                break;
              } //конец представления илиты
              case "телефоны": {
                message.delete(1);
                message.author.sendEmbed(phones);
                break;
              } //конец телефонов
              case "помощь": {
                message.delete();
                message.author.sendEmbed(help);
                break;
              }
              case "отключись": {
                message.delete(1);
                if(message.author.id == config.bot_creator) {
                  console.log("Подана комманда на отключение. Оключение через 10 секунд...");
                  message.channel.sendMessage("Отключаюсь...");
                  sleep.sleep(10);
                  console.log("Отключаюсь...");
                  process.exit();
                } else {
                  message.channel.sendMessage("...");
                }
                break;
              } // 
              case "кикни": {
               let modRole = message.guild.roles.find("name", "ВИП");
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
                let modRole = message.guild.roles.find("name", "ВИП");
                message.delete();
                if(!message.member.roles.has(modRole.id)) {
                  return message.sendMessage("Я не буду тебе подчинатся.");
                };
                if(!args){
                  return message.reply("Ты не указал(-а), что нужно сказать")
                }
                message.channel.sendMessage(args.join(" "));
                break;
              }
            default: {
              message.delete();
              message.channel.sendMessage("Окееей. Я не понял.");
              break;
            } // конец дефаулта
        } 




});
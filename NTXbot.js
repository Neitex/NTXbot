const sleep = require("sleep");
const config = require("./config.json");
const Discord = require("discord.js");
const ntx = new Discord.Client();
const bot = ntx;
function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
{
   var elite = new Discord.RichEmbed()
  .setAuthor("NTXbot")
  .setColor(randomHexColor())
  .setFooter("Доволен? Теперь ты знаешь всю элиту сервера. Ещё есть !телефоны")
  .addField("Паша (Neitex)", "АДМЕН. Создатель этого бота. Имеет заниженную самооценку. Могёт.")
  .addField("Герман (ColdWaker)", "ВИП на сервере. Лучший друг адмена. Могёт.")
  .addField("Никита (RUD)", "ВИП на сервере. Лучший друг лучшего друга адмена. Не могёт.")
  .addField("Артур (Artur)", "Артур. Рост - over9999.")
  .addField("Коляныч (NikolaCat)", "Просто коля. Редко играет :cry:")
  .addField("NTXbot (NTXbot)", "Ну а как же без меня?)")
  .addField("Арсений (стоп. его тоже нужно вписать?)", "Он ниже меня по рангу)");
}

  {
    var phones = new Discord.RichEmbed()
    .setColor(randomHexColor())
    .setAuthor("NTXbot")
    .setFooter("Ода. Ты можешь им позвонить.")
    .addField("Паша (Neitex)", "+375 (44) 559-95-01 ")
    .addField("Герман (ColdWaker)", "+375 (33) 614-53-41 " )
    .addField("Никита (RUD)", "+375 (29) 246-22-42 ")
    .addField("Артур (Artur)", "+375 (29) 333-73-03 (Редко отвечает) ")
    .addField("Коляныч (NikolaCat)", "Держит его в секрете :shrug:")
    .addField("NTXbot (NTXbot)", "Я бот так-то. У меня его нет")
    .addField("Арсений (Не звоните... Не рискуйте)", "+375 (44) 579-64-72 ");
  }

  {
    var help = new Discord.RichEmbed()
    .setAuthor("NTXbot")
    .setColor(randomHexColor())
    .addField("!телефоны", "Показывает номера телефонов илиты")
    .addField("!привет", "Шлёт тебе приветствие (ты одинок если юзаешь это)")
    .addField("!пока", "Провожает тебя из чата")
    .addField("!тылох", "Не надо. Не рискуй.")
    .addField("!илита", "Представляет список илиты (да, Арсений тоже там)")
    .addField("!помощь", "Угадай.");
  }
  {
    var games = new Discord.RichEmbed()
    .setAuthor("NTXbot")
    .setColor(randomHexColor())
    .setFooter("P.S. не заводи тему майнкрафта в общем чате")
    .addField("Counter Strike:Global Offensive", "Самая популярная игра на сервере")
    .addField("Fortnite", "Больше всего играем в неё")
    .addField("Paladins: The champions of the realm", "Редко, но играем")
    .addField("Minecraft", "ColdWaker его ненавидит. Пиши Neitex'y");
  }
//-----------установка констант--------\\

//-----------подключаемся к дикорду----\\
ntx.login(config.TOKEN);
ntx.on('ready', () => {
    ntx.user.setGame("!помощь");
    console.log(`              Скрипт от Neitex'a`);
    console.log(`           Скрипт работает стабильно` );
    console.log(` Скрипт подключён к дискорду как ${ntx.user.tag}!`);
  });
//-----------Скрипт готов к работе-----\\

//-----------Блок приветствия----------\\
ntx.on("guildMemberAdd", function (member) {
  member.guild.channels.find("name", "основной").sendMessage(member.toString() + ", приветствую на сервере! Для помощи напиши !помощь");

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
  member.guild.channels.find("name", "основной").sendMessage(member.toString() + "ушёл с сервера. Удачи! Надеюсь, ты получил удовольствие!");
  sleep.sleep(2);
      member.guild.roles.find("name", member.user.username).delete();
});

//-----------Блок комманд--------------\\
ntx.on('message', function(message){
        if(message.author.equals(ntx.user)) return;
        if(!message.content.startsWith(config.prefix)) return;
        var command = message.content.substring(config.prefix.length).split(" ");

        switch (command[0].toLowerCase()) {
          case "привет":{
            message.reply("Привет! Рад видеть тебя на нашем сервере! :wink::wave:");
            break;
          } //конец привета
          case "пока":{
          message.reply("Пока. Возвращайся скорей :wink:");
          break;
          } //конец пока
          case "тылох": {
              message.channel.send("ЧЕГО БЛ*ТЬ?");
              break;
            } //конец оскорбления
            case "илита":{
              message.channel.sendEmbed(elite);
                break;
              } //конец представления илиты
              case "телефоны": {
                message.channel.sendEmbed(phones);
                break;
              } //конец телефонов
              case "помощь": {
                message.author.sendEmbed(help);
                break;
              }
              case "отключись": {
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
               if(!message.member.roles.has(modRole.id)){
                 return message.reply("Не-а. Ты не достаточно силён для этого.").catch(console.error);
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
                 message.reply("Я его кикнул. Доволен? Теперь ты заставил человека страдать без этого сервера.");
               }).catch(console.error);
                break;
              } //конец кубика
              case "игры": {
                message.channel.sendEmbed(games);
                break;
              }
              case "яна": {
                if(message.author.id === config.bot_creator) {
                  message.delete();
                  message.channel.sendMessage("Ты же сам знаешь..)");
                }
                if(message.author.id === config.german_id) {
                  message.delete(10);
                  message.channel.sendMessage("КАК? ТЫ УЗНАЛ? ОБ ЭТОЙ КОММАНДЕ?");
                  sleep.sleep(1);
                  message.delete(10);
                }
                break;
              }
            default: {
              message.channel.sendMessage("Окееей. Я не понял.");
              break;
            } // конец дефаулта
        } 




});
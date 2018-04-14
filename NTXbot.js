const config = require("./config.json")
const Discord = require("discord.js");
const ntx = new Discord.Client();
const bot = ntx;
function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
{
   var elite = new Discord.RichEmbed()
  .setAuthor("NTXbot: представление элиты")
  .setColor(randomHexColor())
  .setFooter("Доволен? Теперь ты знаешь всю элиту сервера. Ещё есть !телефоны")
  .addField("Паша (Neitex)", "АДМЕН. Создатель этого бота. Имеет заниженную самооценку. Могёт.")
  .addField("Герман (ColdWaker)", "ВИП на сервере. Лучший друг адмена. Могёт.")
  .addField("Никита (RUD)", "ВИП на сервере. Лучший друг лучшего друга адмена. Не могёт.")
  .addField("Артур (Artur)", "Артур. Рост - over9999.")
  .addField("Коляныч (NikolaCat)", "Просто коля. Редко играет :cry:")
  .addField("NTXbot (NTXbot)", "Ну а как же без меня?)")
  .addField("Арсений (стоп. его тоже нужно вписать?)", "Он ниже меня по рангу)")
}

  {
    var phones = new Discord.RichEmbed()
    .setColor(randomHexColor())
    .setFooter("Ода. Ты можешь им позвонить.")
    .addField("Паша (Neitex)", "+375 (44) 559-95-01 ")
    .addField("Герман (ColdWaker)", "+375 (33) 614-53-41 " )
    .addField("Никита (RUD)", "+375 (29) 246-22-42 ")
    .addField("Артур (Artur)", "+375 (29) 333-73-03 (Редко отвечает) ")
    .addField("Коляныч (NikolaCat)", "Держит его в секрете :shrug:")
    .addField("NTXbot (NTXbot)", "Я бот так-то. У меня его нет")
    .addField("Арсений (Не звоните... Не рискуйте)", "+375 (44) 579-64-72 ")
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
    .addField("!помощь", "Угадай.")
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

//-----------Блок комманд--------------\\
ntx.on('message', function(message){
        if(message.author.equals(ntx.user)) return;
        if(!message.content.startsWith(prefix)) return;
        var command = message.content.substring(prefix.length).split(" ");

        switch (command[0].toLowerCase()) {
          case "привет":{
            message.reply("Привет! Рад видеть тебя на нашем сервере! :wink::wave:");
            break;
          } //конец привета
          case "пока":{
          message.reply("Пока. Возвращайся скорей :wink:")
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
            default: {
              message.channel.sendMessage("Окееей. Я не понял.");
              break;
            } // конец дефаулта
        } 




});

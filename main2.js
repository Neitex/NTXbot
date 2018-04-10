const Discord = require("discord.js");
const ntx = new Discord.Client();
const prefix = "!";
const TOKEN = "NDI0NTQyODM4NjUxMzU1MTM4.Daq48w.FzibeFcxfrpy-ulrEizB4sVZaog";
const bot = ntx;
//-----------установка констант--------\\


//-----------подключаемся к дикорду----\\
ntx.login(TOKEN);
ntx.on('ready', () => {
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
                var elite = new Discord.RichEmbed()
              .addField("Паша (Neitex)", "АДМЕН. Создатель этого бота. Могёт.")
              .addField("Герман (ColdWaker)", "ВИП на сервере. Лучший друг адмена. Могёт.")
              .addField("Артур (Artur)", "Артур. Рост - over9999.")
              .addField("Коляныч (NikolaCat)", "Просто коля. Редко играет :cry:")
              .addField("NTXbot (NTXbot)", "Ну а как же без меня?)")
              .addField("Арсений (стоп. его тоже нужно вписать?)", "Он ниже меня по рангу)")
              message.channel.sendEmbed(elite);
                break;
              } //конец представления илиты
            default: {
              message.channel.sendMessage("Окееей. Я не понял.");
              break;
            } // конец дефаулта
        } 




});

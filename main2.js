const Discord = require("discord.js");
const ntx = new Discord.Client();
const prefix = "!" || "?";
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
        





});

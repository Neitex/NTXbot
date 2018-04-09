const Discord = require("discord.js");
const ntx = new Discord.Client();
const prefix = "!";
const TOKEN = "NDI0NTQyODM4NjUxMzU1MTM4.Daq48w.FzibeFcxfrpy-ulrEizB4sVZaog";
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

{ //---------Отвечает привет-----------\\
  ntx.on('message', (message) => {
    if (message == "привет") {
      if (message.author == ntx.user.tag) {
        return;
      } else {
        message.reply("Привет! :wink::wave:");
      }
    }
  });
}

{ //---------Провожает из чата---------\\
  ntx.on('message', (message) => {
    if (message == "пока") {
      if (message.author == ntx.user.tag) {
        return;
      } else {
        message.reply("Пока. Ждём тебя снова :wink:");
      }
    }
  });
}
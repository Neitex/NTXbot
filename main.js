//---------------------НЕ ТРОГАТЬ---------------------///
const commando = require('discord.js-commando');
const discord = require('discord.js');
const bot = new discord.Client({
    owner: "Neitex#7019"
});
const ntx = new commando.Client();
ntx.login("NDI0NTQyODM4NjUxMzU1MTM4.DaoYwQ.Ul5ogSKo_96Q67525KRPlaL3OzQ");
bot.login("NDI0NTQyODM4NjUxMzU1MTM4.DaoYwQ.Ul5ogSKo_96Q67525KRPlaL3OzQ");
ntx.registry.registerGroup('random', 'Random');
ntx.registry.registerDefaults();
ntx.registry.registerCommandsIn(__dirname + "/commands");
console.log("                NTXbot v0.0.0.1(ALPHA)     ");
console.log("          БОТ ЗАПУЩЕН И НАВЕРНОЕ ПОДКЛЮЧЁН     ");
//---------------------НЕ ТРОГАТЬ---------------------///
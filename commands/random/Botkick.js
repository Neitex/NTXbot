const commando = require('discord.js-commando');
const discord = require('discord.js');

class botkick extends commando.Command {
    constructor(ownerOnly) {
        super(ownerOnly, {
            name: 'byebye',
            group: 'random',
            memberName: 'byebye',
            description: "..."
        });
    }
    run(message, args) {
            message.reply("Что ж, придётся.... пока....")
            discord.Client(destroy);
            console.log("ОТКЛЮЧЁН ОТ СЕРВЕРА DISCORD. МОЖНО ЗАКРЫТЬ СКРИПТ")
        } 
}
module.exports = botkick;
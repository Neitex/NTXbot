const commando = require('discord.js-commando');

class mention extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'упомянуть',
            group: 'random',
            memberName: 'mention',
            description: "Упомянет... Наверное"
        });
    };
    run(message, args) {
        var name = args;
        message.reply("Опа, " + name);
    };
};
module.exports = mention;
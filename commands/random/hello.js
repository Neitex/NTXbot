const commando = require('discord.js-commando');

class Hello extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'привет',
            group: 'random',
            memberName: 'hi',
            description: "Says hi to you"
        });
    }
    
run(message, args) {
        message.reply("Привет!");
    }
}
module.exports = Hello;
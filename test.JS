const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NDI0NTQyODM4NjUxMzU1MTM4.DaoYwQ.Ul5ogSKo_96Q67525KRPlaL3OzQ');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});


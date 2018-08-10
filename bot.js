const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "+";
const agree = '✅';
const disagree = '❌';
var failed = 0;

client.on('ready', () => {
console.log('omk ar3a');
});
client.login(process.env.BOT_TOKEN);

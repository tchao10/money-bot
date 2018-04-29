//RUNNING BACKUP 2.js

const Discord = require('discord.js');
const bot = new Discord.Client();

var moneyCount = 0;

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
	if (message.content === '$ping') {
    		message.reply('pong');
  	}
	if (message.content === '$donate') {
		moneyCount++;
		//message.react(message.guild.emojis.get('426956349751164950'));
    		message.reply('thanks, I have $'+moneyCount+' now!');
  	}
});

bot.login(process.env.BOT_TOKEN);

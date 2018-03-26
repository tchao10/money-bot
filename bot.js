const Discord = require('discord.js');
const bot = new Discord.Client();

var moneyCount = 0;

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
	if (message.content === 'ping') {
    	message.reply('pong');
  	}
	if (message.content === '$donate') {
		moneyCount++;
    	message.reply('thanks, I have $'+moneyCount+' now!');
  	}
	//switch(message.content){
	//	case 'ping':
	//		message.reply('dong');
	//	break;
	//	case '$donate':
	//		message.reply('thanks, I have $'+moneyCount+' now!');
	//	break;
});

bot.login(process.env.BOT_TOKEN);

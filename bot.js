const Discord = require('discord.js');
const bot = new Discord.Client();

var moneyCount = 0;
var messagePrefix = "$";

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
	//===== Credit to https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3 ========
	// This event will run on every single message received, from any channel or DM.
	
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	if(message.author.bot)
		return;
		
	// Also good practice to ignore any message that does not start with our prefix, 
	// which is set in the configuration file.
	//if(message.content.indexOf(this.messagePrefix) !== 0)
	//	return;
	
	// Here we separate our "command" name, and our "arguments" for the command. 
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	//===== My Commands (edited) =================================================================
	
	if (command === 'ping') {
    	message.reply('pong');
  	}
	
	if (command === 'donate') {
		this.moneyCount++;
		message.react(message.guild.emojis.get('426956349751164950'));
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

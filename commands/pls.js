module.exports = {
	name: 'pls',
	description: 'Pls',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		var randNum = Math.random();
		
		if (randNum < 0.75){
			message.channel.send('https://i.imgur.com/GReZEZN.png');
		} else {
			message.channel.send('https://i.imgur.com/gK4EbAe.png');
		}
	},
};
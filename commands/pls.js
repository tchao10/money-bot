module.exports = {
	name: 'pls',
	description: 'semilla gay',
	usage: "No usage provided.",
	aliases: ["pls meme"],
	args: false,
	guildOnly: false,
	execute(message, args) {
		var randNum = Math.random();
		
		if (randNum < 0.80){
			message.channel.send('https://i.imgur.com/GReZEZN.png');
		} else {
			message.channel.send('https://i.imgur.com/gK4EbAe.png');
		}
	},
};
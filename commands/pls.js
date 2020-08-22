module.exports = {
	name: "pls",
	description: "semilla gay",
	usage: "meme",
	aliases: [],
	arguments: true,
	guildOnly: false,
	execute(message, arguments){
		var randNum = Math.random();
		
		if (randNum < 0.80){
			message.channel.send("https://i.imgur.com/GReZEZN.png");
		} else {
			message.channel.send("https://i.imgur.com/gK4EbAe.png");
		}
	},
};
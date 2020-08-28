const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
	name: "ping",
	description: "pong",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		const shootIcon = "💥";
		const reloadIcon = "🔂";
		const blockIcon = "🛡";

		message.channel.send(shootIcon + " " + reloadIcon + " " + blockIcon);
		
		message.channel.send("pong").then(sentMessage => {
			message.client.pingMessageID = sentMessage;
			sentMessage.react("👍");
			sentMessage.awaitReactions(filter, { time: 60000, errors: ['time'] })
				.then(collected => {
					const reactedEmoji = collected.first()._emoji.name;
					console.log(reactedEmoji);
					sentMessage.reactions.resolve(reactedEmoji).users.remove(message.author));
				})
				.catch(collected => {
					console.log("You took too long! The game has been stopped.");
				});
			
		});

		const filter = (reaction, user) => {
			return reaction.emoji.name === "👍" && user.id === message.author.id;
		};

		if (message.author.id != 134095374381088768){ // If you are not me
            return;
        }
	},
};
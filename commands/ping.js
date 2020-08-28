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
			sentMessage.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
				.then(collected => console.log(collected))
				.catch(collected => {
					console.log("After 10 seconds, only " + collected.size + " out of 1 reacted.");
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
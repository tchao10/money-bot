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

		message.channel.send("pong").then(async sentMessage => {
			message.client.pingMessageID = sentMessage;

			try {
				await sentMessage.react(shootIcon);
				await sentMessage.react(reloadIcon);
				await sentMessage.react(blockIcon);
			} catch (error){
				console.error("One of the shotgun emojis failed to react.");
				message.channel.send("There was an error starting the shotgun game.");
			}
			
			sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					const reactedEmoji = collected.first()._emoji.name;
					sentMessage.reactions.resolve(reactedEmoji)	.users.remove(message.author);
					message.channel.send("You reacted with " + reactedEmoji);
				})
				.catch(collected => {
					message.channel.send("You took too long! The shotgun game has been stopped.");
				});
			
		});

		const filter = (reaction, user) => {
			return user.id === message.author.id && [shootIcon, reloadIcon, blockIcon].includes(reaction.emoji.name);
		};

		if (message.author.id != 134095374381088768){ // If you are not me
            return;
        }
	},
};
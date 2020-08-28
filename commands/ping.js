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

			await sentMessage.react(shootIcon);
			await sentMessage.react(reloadIcon);
			await sentMessage.react(blockIcon);

			sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					const reactedEmoji = collected.first()._emoji.name;
					console.log(reactedEmoji);
					sentMessage.reactions.resolve(reactedEmoji).users.remove(message.author);
					message.channel.send("You reacted with " + reactedEmoji);
				})
				.catch(collected => {
					message.channel.send("You took too long! The game has been stopped.");
				});
			
		});

		const filter = (reaction, user) => {
			return user.id === message.author.id && (reaction.emoji.name === shootIcon || reaction.emoji.name === reloadIcon || reaction.emoji.name === blockIcon);
		};

		if (message.author.id != 134095374381088768){ // If you are not me
            return;
        }
	},
};
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

		const messageBlock = [];
		messageBlock.push("**message.author (Object, but prints as author.id):** " + message.author);
		messageBlock.push("**message.author.createdAt:** " + message.author.createdAt);
		messageBlock.push("**message.author.createdTimestamp:** " + message.author.createdTimestamp);
		messageBlock.push("**message.author.defaultAvatarURL:** " + message.author.defaultAvatarURL);
		messageBlock.push("**message.author.discriminator:** " + message.author.discriminator);
		messageBlock.push("**message.author.flags:** " + message.author.flags);
		messageBlock.push("**message.author.id:** " + message.author.id);
		messageBlock.push("**message.author.lastMessage (Object, but prints as lastMessageID):** " + message.author.lastMessage);
		messageBlock.push("**message.author.lastMessageChannelID:** " + message.author.lastMessageChannelID);
		messageBlock.push("**message.author.lastMessageID:** " + message.author.lastMessageID);
		messageBlock.push("**message.author.tag:** " + message.author.tag);
		messageBlock.push("**message.author.username:** " + message.author.username);
		messageBlock.push("**message.author.avatarURL():** " + message.author.avatarURL());
		messageBlock.push("**message.author.displayAvatarURL():** " + message.author.displayAvatarURL());
		messageBlock.push("**message.author.toString():** " + message.author.toString());

		message.channel.send(messageBlock);



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
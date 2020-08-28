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
		messageBlock.push("message.author: " + message.author);
		messageBlock.push("\nmessage.author.createdAt: " + message.author.createdAt);
		messageBlock.push("\nmessage.author.createdTimestamp: " + message.author.createdTimestamp);
		messageBlock.push("\nmessage.author.defaultAvatarURL: " + message.author.defaultAvatarURL);
		messageBlock.push("\nmessage.author.discriminator: " + message.author.discriminator);
		messageBlock.push("\nmessage.author.flags: " + message.author.flags);
		messageBlock.push("\nmessage.author.id: " + message.author.id);
		messageBlock.push("\nmessage.author.lastMessage (Object): " + message.author.lastMessage);
		messageBlock.push("\nmessage.author.lastMessageChannelID: " + message.author.lastMessageChannelID);
		messageBlock.push("\nmessage.author.lastMessageID: " + message.author.lastMessageID);
		messageBlock.push("\nmessage.author.system: " + message.author.system);
		messageBlock.push("\nmessage.author.tag: " + message.author.tag);
		messageBlock.push("\nmessage.author.username: " + message.author.username);
		messageBlock.push("\nmessage.author.avatarURL(): " + message.author.avatarURL());
		messageBlock.push("\nmessage.author.displayAvatarURL(): " + message.author.displayAvatarURL());
		messageBlock.push("\nmessage.author.fetch(): " + message.author.fetch());
		messageBlock.push("\nmessage.author.fetchFlags(): " + message.author.fetchFlags());
		messageBlock.push("\nmessage.author.send(): " + message.author.send());
		messageBlock.push("\nmessage.author.toString(): " + message.author.toString());

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
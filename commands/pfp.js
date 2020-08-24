module.exports = {
	name: "pfp",
	description: "Displays a user's profile picture.",
	usage: "@username",
	aliases: ["icon", "avatar"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		// If the first argument is a mentioned user, then show the mentioned user's profile picture
		if (arguments.length && message.mentions.users.first() == arguments[0]){
			return message.channel.send(message.mentions.users.first().displayAvatarURL({ format: "png", dynamic: true }));
		}

		// Otherwise, just show the author's profile picture (this also takes care of "garbage" arguments)
		return message.author.displayAvatarURL({ format: "png", dynamic: true });
	},
};
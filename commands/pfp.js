module.exports = {
	name: "pfp",
	description: "Displays a user's profile picture.",
	usage: "@username",
	aliases: ["icon", "avatar"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		// If the first argument is a mentioned user, then show the mentioned user's profile picture
		/*
		console.log(arguments.length);
		console.log(message.mentions.users.first());
		console.log(arguments[0]);
		*/
		console.log(message.mentions.users.first().id == arguments[0]);
		if (arguments.length && message.mentions.users.first().id == arguments[0]){
			return message.channel.send(message.mentions.users.first().displayAvatarURL({ format: "png", dynamic: true }));
		}

		// Otherwise, just show the author's profile picture (this also takes care of "garbage" arguments)
		return message.channel.send(message.author.displayAvatarURL({ format: "png", dynamic: true }));
	},
};
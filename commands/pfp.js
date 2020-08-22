module.exports = {
	name: "pfp",
	description: "Displays a user's profile picture.",
	usage: "@username",
	aliases: ["icon", "avatar"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		if (!arguments.length){
			return message.channel.send(message.author.displayAvatarURL);
		}

		if (message.mentions.users.first() == arguments[0]){
			return message.channel.send(message.mentions.users.first().displayAvatarURL);
		}

		return message.channel.send("Invalid user.");
	},
};
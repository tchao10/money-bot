module.exports = {
	name: "pfp",
	description: "Displays a user's profile picture.",
	usage: "@username",
	aliases: ["icon", "avatar"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		if (!arguments.size){
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
		}
	},
};
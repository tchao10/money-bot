module.exports = {
	name: "serverinfo",
	description: "Displays some information about this server.",
	usage: "",
	aliases: ["si"],
	arguments: false,
	guildOnly: true,
	execute(message, arguments) {
		const serverInfoArray = [];
		
		serverInfoArray.push("**__Information about " + message.guild.name + "__**\n");
		serverInfoArray.push("**guild.name:** " + message.guild.name);
		serverInfoArray.push("**guild.memberCount:** " + message.guild.memberCount);
		
		return message.channel.send(serverInfoArray);
	},
};
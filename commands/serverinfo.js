module.exports = {
	name: "serverinfo",
	description: "Displays some information about this server.",
	usage: "",
	aliases: ["si"],
	arguments: false,
	guildOnly: true,
	execute(message, arguments) {
		if (!message.guild.available){
			return message.channel.send("Server is not available...");
		}

		const serverInfoArray = [];
		
		serverInfoArray.push("**__Information about " + message.guild.name + "__**\n");
		serverInfoArray.push("**guild.createdAt:** " + message.guild.createdAt);
		serverInfoArray.push("**guild.description:** " + message.guild.description);
		serverInfoArray.push("**guild.icon:** " + message.guild.icon);
		//serverInfoArray.push("**guild.joinedAt (this bot's join time):** " + message.guild.joinedAt);
		serverInfoArray.push("**guild.name:** " + message.guild.name);
		serverInfoArray.push("**guild.memberCount:** " + message.guild.memberCount);
		serverInfoArray.push("**guild.owner (Object, but prints as id):** " + message.guild.owner);
		serverInfoArray.push("**guild.owner.displayName:** " + message.guild.owner.displayName);
		serverInfoArray.push("**guild.region:** " + message.guild.region);
		serverInfoArray.push("**guild.toString():** " + message.guild.toString());
		serverInfoArray.push("");
		
		return message.channel.send(serverInfoArray);
	},
};
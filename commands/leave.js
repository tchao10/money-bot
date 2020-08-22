module.exports = {
	name: "leave",
	description: "Makes the bot leave the voice channel.",
	usage: "",
	aliases: ["stop"],
	arguments: false,
	guildOnly: true,
	execute(message, arguments){
		if (message.member.voiceChannel){
        	message.member.voiceChannel.leave();
			return message.channel.send("bye");
		}

		return message.channel.send("I'm not in a voice channel!");
	},
};
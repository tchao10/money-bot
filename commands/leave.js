module.exports = {
	name: "leave",
	description: "Makes the bot leave the voice channel.",
	usage: "",
	aliases: [],
	args: false,
	guildOnly: true,
	execute(message, args) {
        message.member.voiceChannel.leave();
		message.channel.send("bye");
	},
};
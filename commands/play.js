module.exports = {
	name: "play",
	description: "Plays music.",
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: true,
	execute(message, args) {
		const channel = message.member.voiceChannel;

		if (channel){
			channel.join()
			.then(connection => console.log("Connected into voice channel!"))
			.catch(console.error);

			return message.channel.send("not yet");
		}

		return message.channel.send("You must join a voice channel first!");
	},
};
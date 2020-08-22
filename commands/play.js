module.exports = {
	name: "play",
	description: "Plays music.",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: true,
	execute(message, arguments){
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
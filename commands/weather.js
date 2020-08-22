module.exports = {
	name: "weather",
	description: "Displays the weather.",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	execute(message, arguments) {
		message.channel.send("hot");
	},
};
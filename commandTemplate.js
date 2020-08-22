module.exports = {
	name: "name",
	description: "description",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		message.channel.send("Sample message");
	},
};
module.exports = {
	name: "ping",
	description: "pong",
	usage: "",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.reply("pong");
	},
};
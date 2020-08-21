module.exports = {
	name: 'ping',
	description: 'Ping',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.reply('pong');
	},
};
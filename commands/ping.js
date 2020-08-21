module.exports = {
	name: 'ping',
	description: 'pong',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.reply('pong');
	},
};
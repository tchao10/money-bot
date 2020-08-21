module.exports = {
	name: 'weather',
	description: 'Weather',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.channel.send('hot');
	},
};
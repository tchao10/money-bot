module.exports = {
	name: 'weather',
	description: 'Displays the weather.',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		message.channel.send('hot');
	},
};
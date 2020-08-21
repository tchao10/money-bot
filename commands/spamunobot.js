module.exports = {
	name: 'spamunobot',
	description: 'Spams uno bot',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: true,
	execute(message, args) {
		message.channel.send('uno help && uno help');
		message.channel.send('uno help && uno help');
		message.channel.send('uno help && uno help');
		message.channel.send('uno help && uno help');
	},
};
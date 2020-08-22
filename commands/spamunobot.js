module.exports = {
	name: 'spamunobot',
	description: 'Spams uno bot',
	usage: "No usage provided.",
	aliases: [],
	arguments: false,
	guildOnly: true,
	execute(message, arguments) {
		message.channel.send('uno help && uno help');
		message.channel.send('uno help && uno help');
		message.channel.send('uno help && uno help');
		message.channel.send('uno help && uno help');
	},
};
module.exports = {
	name: 'weather',
	description: 'Weather',
	execute(message, args) {
		message.channel.send('hot');
	},
};
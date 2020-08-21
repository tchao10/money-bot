module.exports = {
	name: 'play',
	description: 'Plays music.',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: true,
	execute(message, args) {
		const channel = message.member.voiceChannel;

		channel.join()
			.then(connection => console.log('Connected into voice channel!'))
			.catch(console.error);

		message.channel.send('not yet');
	},
};
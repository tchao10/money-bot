module.exports = {
	name: 'leave',
	description: 'Makes the bot leave the voice channel.',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: true,
	execute(message, args) {
        message.member.voiceChannel.leave();
		message.channel.send('bye');
	},
};
module.exports = {
	name: 'leave',
	description: 'Leave',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
        message.member.voiceChannel.leave();
		message.channel.send('bye');
	},
};
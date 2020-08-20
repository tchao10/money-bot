module.exports = {
	name: 'leave',
	description: 'Leave',
	execute(message, args) {
        message.member.voiceChannel.leave();
		message.channel.send('bye');
	},
};
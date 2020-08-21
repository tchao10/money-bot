module.exports = {
	name: 'shotgun',
	description: 'Starts a shotgun game.',
	usage: "No usage provided.",
	aliases: ["sg"],
	args: false,
	guildOnly: false,
	execute(message, args) {
        message.reply("Need to move shotgun to `shotgun.js`");
	},
};
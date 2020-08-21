module.exports = {
	name: 'shotgun',
	description: 'Shotgun',
	usage: "No usage provided.",
	aliases: ["sg"],
	args: false,
	guildOnly: false,
	execute(message, args) {
        message.reply("Need to move shotgun to `shotgun.js`");
	},
};
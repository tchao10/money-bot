module.exports = {
	name: "shotgun",
	description: "Starts a shotgun game.",
	usage: "",
	aliases: ["sg"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments) {
        message.reply("Need to move shotgun to `shotgun.js`");
	},
};
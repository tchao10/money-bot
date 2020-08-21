module.exports = {
	name: "donate",
	description: "Donates money to me.",
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		//message.react(message.guild.emojis.get("426956349751164950"));
        message.reply("Need to move donate to `donate.js`");
	},
};
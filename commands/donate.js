module.exports = {
	name: "donate",
	description: "Donates money to me.",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		//message.react(message.guild.emojis.get("426956349751164950"));
        message.reply("Need to move donate to `donate.js`");
	},
};
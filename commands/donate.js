module.exports = {
	name: "donate",
	description: "Donates money to me.",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		message.client.moneyCount++;
		//message.react(message.guild.emojis.get("426956349751164950"));
		message.react("💸");
		message.channel.send("Thanks, I have $" + message.client.moneyCount + " now!");
	},
};
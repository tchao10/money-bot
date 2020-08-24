const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
	name: "ping",
	description: "pong",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	async execute(message, arguments){
		message.channel.send("pong");

		if (message.author.id != 134095374381088768){ // If you are not me
            return;
        }

		var embedMessage;

		const exampleEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Shotgun")
			.setDescription(message.author.toString() + " vs. <@374095302648659980>")
			.setThumbnail("https://cdn.discordapp.com/avatars/374095302648659980/3953362a62cb6a1bdce66f13a31aef4a.png")
			.addFields(
				{ name: "Your health:", value: "Your ammo:", inline: true },
				{ name: "Bot's health:", value: "Bot's ammo:", inline: true },
				{ name: "\u200B", value: "\u200B" },
				{ name: "Inline field title", value: "Some value here", inline: true },
			)
			.setTimestamp()
			.setFooter(prefix + this.name + " help for instructions")

		message.channel.send(exampleEmbed).then(sentMessage => {
			embedMessage = sentMessage;
		});

		//console.log(exampleEmbed);
		//await new Promise(r => setTimeout(r, 1000));

		const newEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Shotgun asdasd")
			.setDescription(message.author.toString() + " vs. <@374095302648659980>")
			.setThumbnail("https://cdn.discordapp.com/avatars/374095302648659980/3953362a62cb6a1bdce66f13a31aef4a.png")
			.addFields(
				{ name: "Your health:", value: "Your ammo:", inline: true },
				{ name: "Bot's health:", value: "Bot's ammo:", inline: true },
				{ name: "\u200B", value: "\u200B" },
				{ name: "Inline field title", value: "Some value here", inline: true },
			)
			.setTimestamp()
			.setFooter(prefix + this.name + " help for instructions")

		embedMessage.edit(newEmbed);
	},
};
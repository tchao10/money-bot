const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
	name: "ping",
	description: "pong",
	usage: "",
	aliases: [],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		message.channel.send("pong").then(sentMessage => {
			message.client.pingMessageID = sentMessage;
		});

		if (message.author.id != 134095374381088768){ // If you are not me
            return;
        }

		
	},
};

const filter = (reaction, user) => {
	return reaction.emoji.name === "👍" && user.id === message.author.id;
};
module.exports = {
	name: "delete",
	description: "Deletes a certain amount of messages from a channel.",
	usage: "[number from 1-20]",
	aliases: ["del", "clear", "prune"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		// Delete just the previous message
		if (!arguments.length){
			return message.channel.bulkDelete(2, true).catch(err => {
				console.error(err);
				message.channel.send('there was an error trying to delete messages in this channel!');
			});
		}

		const deleteAmount = parseInt(arguments[0]) + 1;

		if (isNaN(deleteAmount)) {
			return message.channel.send("Invalid number. Please type `");
		} else if (amount <= 1 || amount > 10) {
			return message.channel.send("You need to input a number between 1 and 10.");
		}



		if (message.mentions.users.first() == arguments[0]){
			return message.channel.send(message.mentions.users.first().displayAvatarURL);
		}

		return message.channel.send("Invalid user.");
	},
};
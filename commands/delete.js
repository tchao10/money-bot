module.exports = {
	name: "delete",
	description: "Deletes a certain amount of messages from a channel.",
	usage: "[number from 1-10]",
	aliases: ["del", "clear", "prune"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		if (message.author.id != 134095374381088768){ // If you are not me
            return message.channel.send("Insufficient permissions.");
        }

		// Delete just the previous message
		if (!arguments.length){
			return message.channel.bulkDelete(2, true).catch(err => {
				console.error(err);
				message.channel.send('There was an error trying to delete messages in this channel!');
			});
		}

		const deleteAmount = parseInt(arguments[0]) + 1;

		if (isNaN(deleteAmount)) {
			return message.channel.send("Invalid number. Please specify a number between 1 and 10.");
		} else if (amount < 2 || amount > 10) {
			return message.channel.send("You need to input a number between 1 and 10.");
		}

		message.channel.bulkDelete(deleteAmount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to delete messages in this channel!');
		});
	},
};
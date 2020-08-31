const { maxDeleteMessages } = require("../config.json"); // Can be up to 99 (the +1 makes this 100)

module.exports = {
	name: "delete",
	description: "Deletes a certain number of messages from a channel. Note that this command cannot delete messages older than two weeks old.",
	usage: "[number from 1-" + maxDeleteMessages + "]",
	aliases: ["del", "clear", "prune"],
	arguments: false,
	guildOnly: true,
	execute(message, arguments){
		// If the user doesn't have the Manage Messages permission, then don't execute the command.
		if (!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.channel.send("You do not have the `Manage Messages` permission.");
        }

		// If there is no number specified, delete just the previous message.
		if (!arguments.length){
			return message.channel.bulkDelete(2, true).catch(err => {
				console.error(err);
				message.channel.send("There was an error trying to delete messages in this channel!");
			});
		}

		// Get the number of messages to delete
		const deleteAmount = parseInt(arguments[0]);

		// Check that the first argument is a number between 1 and maxDeleteMessages.
		if (isNaN(deleteAmount)) {
			return message.channel.send("Invalid number. Please specify a number between 1 and " + maxDeleteMessages + ".");
		} else if (deleteAmount < 1 || deleteAmount > maxDeleteMessages) {
			return message.channel.send("You need to input a number between 1 and " + maxDeleteMessages + ".");
		}

		// Delete the messages
		message.channel.bulkDelete(deleteAmount + 1, true).catch(err => {
			console.error(err);
			message.channel.send("There was an error trying to delete messages in this channel! Make sure this bot has the `Manage Messages` permission.");
		});
	},
};
module.exports = {
	name: "delete",
	description: "Deletes a certain number of messages from a channel. Note that this command cannot delete messages older than two weeks old.",
	usage: "[number from 1-10]",
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
				message.channel.send('There was an error trying to delete messages in this channel!');
			});
		}

		// Get the number of messages to delete
		const deleteAmount = parseInt(arguments[0]);

		// Check that the first argument is a number and is between 1 and 10.
		if (isNaN(deleteAmount)) {
			return message.channel.send("Invalid number. Please specify a number between 1 and 10.");
		} else if (deleteAmount < 1 || deleteAmount > 10) {
			return message.channel.send("You need to input a number between 1 and 10.");
		}

		// Delete the messages
		message.channel.bulkDelete(deleteAmount + 1, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to delete messages in this channel!');
		});
	},
};
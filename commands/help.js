const { prefix, globalCooldownAmount } = require("../config.json");

module.exports = {
	name: "help",
	description: "Displays a list of commands.",
	usage: "[command name (optional)]",
	aliases: ["commands"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		// Create a array to build the message, and get list of commands
		const data = [];
		const { commands } = message.client;

		// Build message for the list of commands
		if (!arguments.length) {
			data.push("Here's a list of all my commands:");
			data.push("`" + commands.map(command => command.name).join("`, `") + "`");
			data.push("\nYou can send `" + prefix + "help [command name]` to get info on a specific command!");

			return message.channel.send(data);

			/* 
			This commented block sends the help message via DM instead


			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === "dm"){
						return;
					}
					message.reply("I've sent you a DM with all my commands!");
				})
				.catch(error => {
					console.error("Could not send help DM to " + message.author.tag + ".\n", error);
					message.reply("it seems like I can't DM you! Do you have DMs disabled?");
				});
			*/
		}

		
		// Build message for the help page of a command

		const name = arguments[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply("that's not a valid command!");
		}

		data.push("**Name:** `" + command.name + "`");

		if (command.description){
			data.push("**Description:** " + command.description);
		} else {
			data.push("**Description:** No description provided.");
		}
		
		if (command.aliases.length){
			data.push("**Aliases:** `" + command.aliases.join("`, `") + "`");
		} else {
			data.push("**Aliases:** No aliases.");
		}

		if (command.usage){
			data.push("**Usage:** `" + prefix + command.name + " " + command.usage + "`");
		} else {
			data.push("**Usage:** `" + prefix + command.name + "`");
		}

		data.push("**Cooldown:** " + (command.cooldown || globalCooldownAmount) + " second(s)");

		message.channel.send(data, { split: true });
	},
};
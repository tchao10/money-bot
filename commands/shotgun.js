module.exports = {
	name: "shotgun",
	description: "Plays a shotgun game.",
	usage: "[start/stop/shoot/reload/block/help]",
	aliases: ["sg"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments) {
		// Display help message
		if (!arguments.length || arguments[0] == "help" || arguments[0] == "h"){
			return message.channel.send("send explanation here");
		}

		// Start a game
		if (arguments[0] === "shotgun" || commandName === "sg"){
			if (!shotgunGameEnabled){
				shotgunGameEnabled = true;
				playerName = message.author.username;
				message.channel.send("Your Health: " + playerHealth + ",   Your Ammo: " + playerAmmo + "\nMy Health: " + botHealth + ",      My Ammo: " + botAmmo + "\nSelect your move: `" + prefix + "shoot`, `" + prefix + "reload`, or `" + prefix + "block`? Or you can quit using `" + prefix + "shotgunstop`.");
			} else {
				message.channel.send("There is already a game in progress.");
			}
		}


	},
};
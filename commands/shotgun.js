const Discord = require("discord.js");
const { prefix, enableShotgunReactions } = require("../config.json");

const shootIcon = "💥";
const reloadIcon = "🔂";
const blockIcon = "🛡";

const messageLog = [];

module.exports = {
	name: "shotgun",
	description: "Plays a shotgun game.",
	usage: "[help/start/stop/shoot/reload/block]",
	aliases: ["sg"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		// Display help message
		if (!arguments.length || arguments[0] == "help"){
			return message.channel.send("Shotgun is a simple turn-based game versus <@" + message.client.user.id + ">. There are three actions you can take each turn:\n\n" + shootIcon + " `" + prefix + this.name + " shoot` shoots your gun if you have ammo.\n" + reloadIcon + " `" + prefix + this.name + " reload` adds one bullet to your gun.\n" + blockIcon + " `" + prefix + this.name + " block` protects you from getting shot that turn.\n\nThe first player to get their opponent's health to 0 wins! Start a game by typing `" + prefix + this.name + " start`.");
		}

		// Start a game
		if (arguments[0] == "start" || arguments[0] == "begin" || arguments[0] == "b"){
			if (!message.client.shotgunGameEnabled){
				message.client.shotgunGameEnabled = true;
				message.client.activePlayer = message.author;
				createEmbed(message, this.name);
				if (!enableShotgunReactions){
					message.channel.send("**Select your move:** `" + prefix + this.name + " shoot`, `" + prefix + this.name + " reload`, or `" + prefix + this.name + " block`?\n(You can type `" + prefix + this.name + "` for help or `" + prefix + this.name + " stop` to stop the game.)");
				}
			} else {
				message.channel.send("There is already a game in progress.");
			}
			
			return;
		}

		// If you are me, force stop the game
		if (message.client.shotgunGameEnabled && message.author.id == 134095374381088768 && (arguments[0] == "forcestop" || arguments[0] == "fs")){
			shotgunReset(message);
			return message.channel.send("Shotgun game force-stopped.");
		}

		// If the game is active and the message author is the active player, then stop/shoot/reload/block
		if (message.client.shotgunGameEnabled){
			if (message.author === message.client.activePlayer){
				if (arguments[0] == "stop" || arguments[0] == "quit" || arguments[0] == "q"){
					shotgunReset(message);
					message.channel.send("Shotgun game stopped.");
				} else if (arguments[0] == "shoot" || arguments[0] == "sh"){
					playerShoot(message, this.name);
				} else if (arguments[0] == "reload" || arguments[0] == "re"){
					playerReload(message, this.name);
				} else if (arguments[0] == "block" || arguments[0] == "bl"){
					playerBlock(message, this.name);
				}
			} else {
				message.channel.send("You're not " + message.client.activePlayer.username + "!");
			}
		} else {
			message.channel.send("There is no shotgun game in progress.");
		}

		return;
	},
};

async function createEmbed(message, commandName){
	const shotgunEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Shotgun (Turn " + message.client.shotgunTurnCounter + ")")
		.setDescription(message.author.toString() + " vs. <@" + message.client.user.id + ">")
		.setThumbnail("https://cdn.discordapp.com/avatars/374095302648659980/3953362a62cb6a1bdce66f13a31aef4a.png")
		.addFields(
			{ name: "\u200B\nYour health: " + message.client.playerHealth + "   vs.", value: "Your ammo: " + message.client.playerAmmo, inline: true },
			{ name: "\u200B\nBot's health: " + message.client.botHealth, value: "Bot's ammo: " + message.client.botAmmo, inline: true },
			{ name: "\u200B\n__Action Log__", value: "(`" + prefix + commandName + " help` for instructions.)\n\u200b" },
		)
		.setFooter(prefix + commandName + " help for instructions")
		.setTimestamp()
		
	await message.channel.send(shotgunEmbed).then(sentMessage => {
		message.client.embedMessage = sentMessage;
	});

	if (enableShotgunReactions){
		createReactionCollector(message, commandName);
	}
}

function updateEmbed(message, commandName){
	message.client.shotgunTurnCounter++;
	messageLog.push("\u200B"); // Inserts one more blank line in message log
	
	const editedShotgunEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Shotgun (Turn " + message.client.shotgunTurnCounter + ")")
		.setDescription(message.author.toString() + " vs. <@" + message.client.user.id + ">")
		.setThumbnail("https://cdn.discordapp.com/avatars/374095302648659980/3953362a62cb6a1bdce66f13a31aef4a.png")
		.addFields(
			{ name: "\u200B\nYour health: " + message.client.playerHealth + "   vs.", value: "Your ammo: " + message.client.playerAmmo, inline: true },
			{ name: "\u200B\nBot's health: " + message.client.botHealth, value: "Bot's ammo: " + message.client.botAmmo, inline: true },
			{ name: "\u200B\n__Action Log__", value: messageLog.join("\n") },
		)
		.setFooter(prefix + commandName + " help for instructions")
		.setTimestamp()

	message.client.embedMessage.edit(editedShotgunEmbed);

	messageLog.length = 0;
	
	if (enableShotgunReactions && !checkGameOver(message)){
		createReactionCollector(message, commandName);
	}
}

async function createReactionCollector(message, commandName){
	try {
		await message.client.embedMessage.react(shootIcon);
		await message.client.embedMessage.react(reloadIcon);
		await message.client.embedMessage.react(blockIcon);
	} catch (error){
		console.error("One of the shotgun emojis failed to react.");
		console.error(error);
		message.channel.send("There was an error starting the shotgun game.");
	}

	const validReactionChecker = (reaction, user) => {
		return user.id === message.author.id && [shootIcon, reloadIcon, blockIcon].includes(reaction.emoji.name);
	};

	message.client.embedMessage.awaitReactions(validReactionChecker, { max: 1,	 time: 60000, errors: ["time"] })
		.then(collected => {
			const reactedEmoji = collected.first()._emoji.name;

			message.client.embedMessage.reactions.resolve(reactedEmoji).users.remove(message.author);
			
			if (reactedEmoji == shootIcon){
				playerShoot(message, commandName);
			} else if (reactedEmoji == reloadIcon){
				playerReload(message, commandName);
			} else if (reactedEmoji == blockIcon){
				playerBlock(message, commandName);
			} else {
				message.channel.send("Error receiving reaction.");
			}
		})
		.catch(collected => {
			message.channel.send("You took too long! The shotgun game has been stopped.");
			shotgunReset(message);
		});
}

function playerShoot(message, commandName){
	AISelectMove(message);
	
	if (message.client.playerAmmo == 0){
		messageLog.push(shootIcon + " You shoot!... but you have no ammo.");
	} else {
		if (message.client.botBlocked){
			messageLog.push(shootIcon + " You shoot!... but <@" + message.client.user.id + "> blocks the bullet. " + blockIcon);
		} else {
			message.client.botHealth--;
			messageLog.push(shootIcon + " You shoot!... and it hits! <@" + message.client.user.id + "> loses some health. 🩸");
		}
		message.client.playerAmmo--;
	}
	
	performEndOfTurnStuff(message, commandName);
}

function playerReload(message, commandName){
	AISelectMove(message);
					
	message.client.playerAmmo++;
	messageLog.push(reloadIcon + " You load a bullet.");
	
	performEndOfTurnStuff(message, commandName);
}

function playerBlock(message, commandName){
	AISelectMove(message);
					
	message.client.playerBlocked = true;
	messageLog.push(blockIcon + " You block this turn.");
	
	performEndOfTurnStuff(message, commandName);
}

function AISelectMove(message){
	const pAmmo = message.client.playerAmmo;
	const bAmmo = message.client.botAmmo;

	if (pAmmo == 0 && bAmmo == 0){
		message.client.botMoveNum = 1;
	} else if (bAmmo == 0){
		if (Math.random() < 0.5){
			message.client.botMoveNum = 2;
			AIBlock(message, messageLog);
		} else {
			message.client.botMoveNum = 1;
		}
	} else if (pAmmo == 0){
		if (Math.random() < 0.5){
			message.client.botMoveNum = 0;
		} else {
			message.client.botMoveNum = 1;
		}
	} else if (bAmmo >= 2){
		if (Math.random() < 0.5){
			message.client.botMoveNum = 0;
		} else {
			message.client.botMoveNum = 2;
			AIBlock(message, messageLog);
		}
	} else {
		if (Math.random() < 0.3333333333333333){
			message.client.botMoveNum = 0;
		} else if (Math.random() < 0.66666666666666666){
			message.client.botMoveNum = 1;
		} else {
			message.client.botMoveNum = 2;
			AIBlock(message, messageLog);
		}
	}
}

function AIPerformMove(message){
	const moveNum = message.client.botMoveNum;

	if (moveNum == 0){
		AIShoot(message, messageLog);
	} else if (moveNum == 1){
		AIReload(message, messageLog);
	} else {
		// this is done earlier in selectMove
		//AIBlock(message, messageLog);
	}
}

function AIShoot(message){
	const pBlocked = message.client.playerBlocked;

	if (pBlocked){
		messageLog.push(shootIcon + " <@" + message.client.user.id + "> shoots!... but you blocked the bullet. " + shieldIcon);
	} else {
		message.client.playerHealth--;
		messageLog.push(shootIcon + " <@" + message.client.user.id + "> shoots!... and it hits! You lose some health. 🩸");
	}
	message.client.botAmmo--;
}

function AIReload(message){
	message.client.botAmmo++;
	messageLog.push(reloadIcon + " <@" + message.client.user.id + "> loads in a bullet.");
}

function AIBlock(message){
	message.client.botBlocked = true;
	messageLog.push(blockIcon + " <@" + message.client.user.id + "> blocks this turn.");
}

function resetBlocked(message){
	message.client.playerBlocked = false;
	message.client.botBlocked = false;
}

function checkGameOver(message){
	return (message.client.playerHealth == 0 || message.client.botHealth == 0);
}

function performEndOfTurnStuff(message, commandName){
	AIPerformMove(message);
	resetBlocked(message);

	if (checkGameOver(message)){
		displayEndGameResults(message, commandName);
		shotgunReset(message);
	} else {
		updateEmbed(message, commandName);
	}

	/*
	message.delete().catch(err => {
		console.log("The bot doesn't have the Manage Messages permission... so here's an error message (source: shotgun): ");
		console.error(err);
	});
	*/
}

function displayEndGameResults(message, commandName){
	if (message.client.playerHealth == 0 && message.client.botHealth == 0){
		messageLog.push("\:regional_indicator_f: **You killed each other! You both lose.** \:regional_indicator_f:");
	} else if (message.client.playerHealth == 0){
		messageLog.push("🥈 **You lose!** 🥈");
	} else {
		messageLog.push("🏆 **You win!** 🏆");
	}

	updateEmbed(message, commandName);
}

function shotgunReset(message){
	message.client.shotgunGameEnabled = false;
	message.client.shotgunTurnCounter = 1;
	message.client.embedMessage = null;
	message.client.activePlayer = null;
	message.client.playerHealth = 2;
	message.client.playerAmmo = 0;
	message.client.playerBlocked = false;
	message.client.botHealth = 2;
	message.client.botAmmo = 0;
	message.client.botBlocked = false;
	message.client.botMoveNum = -1;
}
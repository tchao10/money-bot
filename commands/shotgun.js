const Discord = require('discord.js');
const { prefix } = require("../config.json");

module.exports = {
	name: "shotgun",
	description: "Plays a shotgun game.",
	usage: "[help/start/stop/shoot/reload/block]",
	aliases: ["sg"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		var messageLog = [];

		// Start a game
		if (arguments[0] == "start"){
			if (!message.client.shotgunGameEnabled){
				message.client.shotgunGameEnabled = true;
				message.client.playerName = message.author.username;
				createEmbed(message, this.name);
				message.channel.send("**Select your move:** `" + prefix + this.name + " shoot`, `" + prefix + this.name + " reload`, or `" + prefix + this.name + " block`?\n(You can type `" + prefix + this.name + "` for help or `" + prefix + this.name + " stop` to stop the game.)");
			} else {
				message.channel.send("There is already a game in progress.");
			}
			
			return;
		}

		// Stop the game
		if (arguments[0] == "stop"){
			if (message.client.shotgunGameEnabled){
				shotgunReset(message);
				message.channel.send("Shotgun game stopped.");
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Player shoots
		if (arguments[0] == "shoot"){
			if (message.client.shotgunGameEnabled){
				if (message.author.username === message.client.playerName){
					shotgunAISelectMove(message, messageLog);
					
					if (message.client.playerAmmo == 0){
						messageLog.push("You shoot!... but you have no ammo.");
					} else {
						if (message.client.botBlocked){
							messageLog.push("You shoot!... but I blocked this turn.");
						} else {
							message.client.botHealth--;
							messageLog.push("You shoot!... and it hits! I lose some health.");
						}
						message.client.playerAmmo--;
					}
					
					shotgunAIPerformMove(message, messageLog);
					shotgunResetBlocked(message);

					if (shotgunCheckGameOver(message.client.playerHealth, message.client.botHealth)){
						if (message.client.playerHealth == 0 && message.client.botHealth == 0){
							messageLog.push("We killed each other! We both lose.");
						} else if (message.client.playerHealth == 0){
							messageLog.push("You lose!");
						} else {
							messageLog.push("You win!");
						}

						updateEmbed(message, this.name, messageLog);
						
						shotgunReset(message);
					} else {
						updateEmbed(message, this.name, messageLog);
					}
				} else {
					message.channel.send("You're not "+message.client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Player reloads
		if (arguments[0] == "reload"){
			if (message.client.shotgunGameEnabled){
				if (message.author.username === message.client.playerName){
					shotgunAISelectMove(message, messageLog);
					
					message.client.playerAmmo++;
					messageLog.push("You load a bullet.");
					
					shotgunAIPerformMove(message, messageLog);
					shotgunResetBlocked(message);

					if (shotgunCheckGameOver(message.client.playerHealth, message.client.botHealth)){
						if (message.client.playerHealth == 0 && message.client.botHealth == 0){
							messageLog.push("We killed each other! We both lose.");
						} else if (message.client.playerHealth == 0){
							messageLog.push("You lose!");
						} else {
							messageLog.push("You win!");
						}

						updateEmbed(message, this.name, messageLog);
						
						shotgunReset(message);
					} else {
						updateEmbed(message, this.name, messageLog);
					}
				} else {
					message.channel.send("You're not "+message.client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Player blocks
		if (arguments[0] == "block"){
			if (message.client.shotgunGameEnabled){
				if (message.author.username === message.client.playerName){
					shotgunAISelectMove(message, messageLog);
					
					message.client.playerBlocked = true;
					messageLog.push("You block this turn.");
					
					shotgunAIPerformMove(message, messageLog);
					shotgunResetBlocked(message);

					if (shotgunCheckGameOver(message.client.playerHealth, message.client.botHealth)){
						if (message.client.playerHealth == 0 && message.client.botHealth == 0){
							messageLog.push("We killed each other! We both lose.");
						} else if (message.client.playerHealth == 0){
							messageLog.push("You lose!");
						} else {
							messageLog.push("You win!");
						}

						updateEmbed(message, this.name, messageLog);
						
						shotgunReset(message);
					} else {
						updateEmbed(message, this.name, messageLog);
					}
				} else {
					message.channel.send("You're not "+message.client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Display help message
		if (!arguments.length || arguments[0] == "help"){
			return message.channel.send("Shotgun is a simple turn-based game versus <@374095302648659980>. There are three actions you can take each turn:\n\n`" + prefix + this.name + " shoot` shoots your gun if you have ammo.\n`" + prefix + this.name + " reload` adds one bullet to your gun.\n`" + prefix + this.name + " block` protects you from getting shot that turn.\n\nThe first player to get their opponent's health to 0 wins! Start a game by typing `" + prefix + this.name + " start`.");
		}

		return;
	},
};

function createEmbed(message, commandName){
	const shotgunEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Shotgun (Turn " + message.client.shotgunTurnCounter + ")")
		.setDescription(message.author.toString() + " vs. <@374095302648659980>")
		.setThumbnail("https://cdn.discordapp.com/avatars/374095302648659980/3953362a62cb6a1bdce66f13a31aef4a.png")
		.addFields(
			{ name: "\u200B\nYour health: " + message.client.playerHealth + "   vs.", value: "Your ammo: " + message.client.playerAmmo, inline: true },
			{ name: "\u200B\nBot's health: " + message.client.botHealth, value: "Bot's ammo: " + message.client.botAmmo, inline: true },
			{ name: "\u200B\n__Action Log__", value: "\u200B\n\u200B" },
		)
		.setFooter(prefix + commandName + " help for instructions")
		.setTimestamp()

	message.channel.send(shotgunEmbed).then(sentMessage => {
		message.client.embedMessage = sentMessage;
	});
}

function updateEmbed(message, commandName, messageLog){
	message.client.shotgunTurnCounter++;

	const editedShotgunEmbed = new Discord.MessageEmbed()
		.setColor("#0099ff")
		.setTitle("Shotgun (Turn " + message.client.shotgunTurnCounter + ")")
		.setDescription(message.author.toString() + " vs. <@374095302648659980>")
		.setThumbnail("https://cdn.discordapp.com/avatars/374095302648659980/3953362a62cb6a1bdce66f13a31aef4a.png")
		.addFields(
			{ name: "\u200B\nYour health: " + message.client.playerHealth + "   vs.", value: "Your ammo: " + message.client.playerAmmo, inline: true },
			{ name: "\u200B\nBot's health: " + message.client.botHealth, value: "Bot's ammo: " + message.client.botAmmo, inline: true },
			{ name: "\u200B\n__Action Log__", value: messageLog.join("\n") },
		)
		.setFooter(prefix + commandName + " help for instructions")
		.setTimestamp()

	message.client.embedMessage.edit(editedShotgunEmbed);
}

function shotgunAISelectMove(message, messageLog){
	const pAmmo = message.client.playerAmmo;
	const bAmmo = message.client.botAmmo;

	if (pAmmo == 0 && bAmmo == 0){
		message.client.botMoveNum = 1;
	} else if (bAmmo == 0){
		if (Math.random() < 0.5){
			message.client.botMoveNum = 2;
			shotgunAIBlock(message, messageLog);
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
			shotgunAIBlock(message, messageLog);
		}
	} else {
		if (Math.random() < 0.3333333333333333){
			message.client.botMoveNum = 0;
		} else if (Math.random() < 0.66666666666666666){
			message.client.botMoveNum = 1;
		} else {
			message.client.botMoveNum = 2;
			shotgunAIBlock(message, messageLog);
		}
	}
}

function shotgunAIPerformMove(message, messageLog){
	const moveNum = message.client.botMoveNum;
	const pBlocked = message.client.playerBlocked;

	if (moveNum == 0){
		shotgunAIShoot(message, messageLog);
	} else if (moveNum == 1){
		shotgunAIReload(message, messageLog);
	} else {
		// this is done earlier in selectMove
		//shotgunAIBlock(message, messageLog);
	}
}

function shotgunAIShoot(message, messageLog){
	const pBlocked = message.client.playerBlocked;

	if (pBlocked){
		messageLog.push("I shoot!... but you blocked my bullet.");
	} else {
		message.client.playerHealth--;
		messageLog.push("I shoot!... and it hits! You lose some health.");
	}
	message.client.botAmmo--;
}

function shotgunAIReload(message, messageLog){
	message.client.botAmmo++;
	messageLog.push("I load in a bullet.");
}

function shotgunAIBlock(message, messageLog){
	message.client.botBlocked = true;
	messageLog.push("I block this turn.");
}

function shotgunResetBlocked(message){
	message.client.playerBlocked = false;
	message.client.botBlocked = false;
}

function shotgunCheckGameOver(pHealth, bHealth){
	return (pHealth == 0 || bHealth == 0);
}

function shotgunReset(message){
	message.client.shotgunGameEnabled = false;
	message.client.shotgunTurnCounter = 1;
	message.client.embedMessage = null;
	message.client.playerName = null;
	message.client.playerHealth = 2;
	message.client.playerAmmo = 0;
	message.client.playerBlocked = false;
	message.client.botHealth = 2;
	message.client.botAmmo = 0;
	message.client.botBlocked = false;
	message.client.botMoveNum = -1;
}
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
		const shootIcon = "💥";
		const reloadIcon = "🔂";
		const blockIcon = "🛡";
		var messageLog = [];
		const client = message.client;

		// Start a game
		if (arguments[0] == "start" || arguments[0] == "begin" || arguments[0] == "b"){
			if (!client.shotgunGameEnabled){
				client.shotgunGameEnabled = true;
				client.playerName = message.author.username;
				createEmbed(message, this.name);
				message.channel.send("**Select your move:** `" + prefix + this.name + " shoot`, `" + prefix + this.name + " reload`, or `" + prefix + this.name + " block`?\n(You can type `" + prefix + this.name + "` for help or `" + prefix + this.name + " stop` to stop the game.)");
			} else {
				message.channel.send("There is already a game in progress.");
			}
			
			return;
		}

		// Stop the game
		if (arguments[0] == "stop" || arguments[0] == "quit" || arguments[0] == "q"){
			if (client.shotgunGameEnabled){
				if (message.author.username === client.playerName || message.author.id == 134095374381088768){ // Or if you are me
					shotgunReset(client);
					message.channel.send("Shotgun game stopped.");
				} else {
					message.channel.send("You're not "+client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Player shoots
		if (arguments[0] == "shoot" || arguments[0] == "sh"){
			if (client.shotgunGameEnabled){
				if (message.author.username === client.playerName){
					shotgunAISelectMove(client, messageLog);
					
					if (client.playerAmmo == 0){
						messageLog.push("You shoot!... but you have no ammo.");
					} else {
						if (client.botBlocked){
							messageLog.push("You shoot!... but I blocked this turn.");
						} else {
							client.botHealth--;
							messageLog.push("You shoot!... and it hits! I lose some health.");
						}
						client.playerAmmo--;
					}
					
					shotgunAIPerformMove(client, messageLog);
					shotgunResetBlocked(client);

					if (shotgunCheckGameOver(client.playerHealth, client.botHealth)){
						if (client.playerHealth == 0 && client.botHealth == 0){
							messageLog.push("We killed each other! We both lose.");
						} else if (client.playerHealth == 0){
							messageLog.push("You lose!");
						} else {
							messageLog.push("You win!");
						}

						updateEmbed(client, this.name, messageLog);
						
						shotgunReset(client);
					} else {
						updateEmbed(client, this.name, messageLog);
					}
				} else {
					message.channel.send("You're not "+client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Player reloads
		if (arguments[0] == "reload" || arguments[0] == "r"){
			if (client.shotgunGameEnabled){
				if (message.author.username === client.playerName){
					shotgunAISelectMove(client, messageLog);
					
					client.playerAmmo++;
					messageLog.push("You load a bullet.");
					
					shotgunAIPerformMove(client, messageLog);
					shotgunResetBlocked(client);

					if (shotgunCheckGameOver(client.playerHealth, client.botHealth)){
						if (client.playerHealth == 0 && client.botHealth == 0){
							messageLog.push("We killed each other! We both lose.");
						} else if (client.playerHealth == 0){
							messageLog.push("You lose!");
						} else {
							messageLog.push("You win!");
						}

						updateEmbed(client, this.name, messageLog);
						
						shotgunReset(client);
					} else {
						updateEmbed(client, this.name, messageLog);
					}
				} else {
					message.channel.send("You're not "+client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}

			return;
		}

		// Player blocks
		if (arguments[0] == "block" || arguments[0] == "b"){
			if (client.shotgunGameEnabled){
				if (message.author.username === client.playerName){
					shotgunAISelectMove(client, messageLog);
					
					client.playerBlocked = true;
					messageLog.push("You block this turn.");
					
					shotgunAIPerformMove(client, messageLog);
					shotgunResetBlocked(client);

					if (shotgunCheckGameOver(client.playerHealth, client.botHealth)){
						if (client.playerHealth == 0 && client.botHealth == 0){
							messageLog.push("We killed each other! We both lose.");
						} else if (client.playerHealth == 0){
							messageLog.push("You lose!");
						} else {
							messageLog.push("You win!");
						}

						updateEmbed(client, this.name, messageLog);
						
						shotgunReset(client);
					} else {
						updateEmbed(client, this.name, messageLog);
					}
				} else {
					message.channel.send("You're not "+client.playerName.avatar+"!");
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
			{ name: "\u200B\n__Action Log__", value: "(`" + prefix + commandName + " help` for instructions.)\n\u200b" },
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

function shotgunAISelectMove(client, messageLog){
	const pAmmo = client.playerAmmo;
	const bAmmo = client.botAmmo;

	if (pAmmo == 0 && bAmmo == 0){
		client.botMoveNum = 1;
	} else if (bAmmo == 0){
		if (Math.random() < 0.5){
			client.botMoveNum = 2;
			shotgunAIBlock(client, messageLog);
		} else {
			client.botMoveNum = 1;
		}
	} else if (pAmmo == 0){
		if (Math.random() < 0.5){
			client.botMoveNum = 0;
		} else {
			client.botMoveNum = 1;
		}
	} else if (bAmmo >= 2){
		if (Math.random() < 0.5){
			client.botMoveNum = 0;
		} else {
			client.botMoveNum = 2;
			shotgunAIBlock(client, messageLog);
		}
	} else {
		if (Math.random() < 0.3333333333333333){
			client.botMoveNum = 0;
		} else if (Math.random() < 0.66666666666666666){
			client.botMoveNum = 1;
		} else {
			client.botMoveNum = 2;
			shotgunAIBlock(client, messageLog);
		}
	}
}

function shotgunAIPerformMove(client, messageLog){
	const moveNum = client.botMoveNum;
	const pBlocked = client.playerBlocked;

	if (moveNum == 0){
		shotgunAIShoot(client, messageLog);
	} else if (moveNum == 1){
		shotgunAIReload(client, messageLog);
	} else {
		// this is done earlier in selectMove
		//shotgunAIBlock(client, messageLog);
	}
}

function shotgunAIShoot(client, messageLog){
	const pBlocked = client.playerBlocked;

	if (pBlocked){
		messageLog.push("I shoot!... but you blocked my bullet.");
	} else {
		client.playerHealth--;
		messageLog.push("I shoot!... and it hits! You lose some health.");
	}
	client.botAmmo--;
}

function shotgunAIReload(client, messageLog){
	client.botAmmo++;
	messageLog.push("I load in a bullet.");
}

function shotgunAIBlock(client, messageLog){
	client.botBlocked = true;
	messageLog.push("I block this turn.");
}

function shotgunResetBlocked(client){
	client.playerBlocked = false;
	client.botBlocked = false;
}

function shotgunCheckGameOver(pHealth, bHealth){
	return (pHealth == 0 || bHealth == 0);
}

function shotgunReset(client){
	client.shotgunGameEnabled = false;
	client.shotgunTurnCounter = 1;
	client.embedMessage = null;
	client.playerName = null;
	client.playerHealth = 2;
	client.playerAmmo = 0;
	client.playerBlocked = false;
	client.botHealth = 2;
	client.botAmmo = 0;
	client.botBlocked = false;
	client.botMoveNum = -1;
}
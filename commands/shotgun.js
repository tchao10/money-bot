const { prefix } = require("../config.json");

module.exports = {
	name: "shotgun",
	description: "Plays a shotgun game.",
	usage: "[start/stop/shoot/reload/block/help]",
	aliases: ["sg"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
		// Start a game
		if (arguments[0] == "start"){
			if (!message.client.shotgunGameEnabled){
				message.client.shotgunGameEnabled = true;
				message.client.playerName = message.author.username;
				message.channel.send("Your Health: " + message.client.playerHealth + ",   Your Ammo: " + message.client.playerAmmo + "\nMy Health: " + message.client.botHealth + ",      My Ammo: " + message.client.botAmmo + "\nSelect your move: `" + prefix + "shoot`, `" + prefix + "reload`, or `" + prefix + "block`? Or you can quit using `" + prefix + "shotgunstop`.");
			} else {
				message.channel.send("There is already a game in progress.");
			}
		}

		// Stop a game
		if (arguments[0] == "stop"){
			if (message.client.shotgunGameEnabled){
				shotgunStop();
				message.channel.send("Shotgun game stopped.");
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}
		}

		// Player shoots
		if (arguments[0] == "shoot"){
			if (message.client.shotgunGameEnabled){
				if (message.author.username === message.client.playerName){
					shotgunAISelectMove(message.client.playerAmmo, message.client.botAmmo);
					
					if (message.client.playerAmmo == 0){
						message.channel.send("You shoot!... but you have no ammo.");
					} else {
						if (message.client.botBlocked){
							message.channel.send("You shoot!... but I blocked this turn.");
						} else {
							message.client.botHealth--;
							message.channel.send("You shoot!... and it hits! I lose some health.");
						}
						message.client.playerAmmo--;
					}
					
					shotgunAIPerformMove(message.client.botMoveNum, message.client.playerBlocked);
					shotgunResetBlocked();
					message.channel.send("Your Health: " + message.client.playerHealth + ",   Your Ammo: " + message.client.playerAmmo + "\nMy Health: " + message.client.botHealth + ",      My Ammo: " + message.client.botAmmo);
					if (shotgunCheckGameOver(message.client.playerHealth, message.client.botHealth)){
						if (message.client.playerHealth == 0 && message.client.botHealth == 0){
							message.channel.send("We killed each other! We both lose.");
						} else if (message.client.playerHealth == 0){
							message.channel.send("You lose!");
						} else {
							message.channel.send("You win!");
						}
						
						shotgunStop();
					}
				} else {
					message.channel.send("you're not "+message.client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("there is no shotgun game in progress.");
			}
		}

		// Player reloads
		if (arguments[0] == "reload"){
			if (message.client.shotgunGameEnabled){
				if (message.author.username === message.client.playerName){
					shotgunAISelectMove(message.client.playerAmmo, message.client.botAmmo);
					
					message.client.playerAmmo++;
					message.channel.send("You load a bullet.");
					
					shotgunAIPerformMove(message.client.botMoveNum, message.client.playerBlocked);
					shotgunResetBlocked();
					message.channel.send("Your Health: " + message.client.playerHealth + ",   Your Ammo: " + message.client.playerAmmo + "\nMy Health: " + message.client.botHealth + ",      My Ammo: " + message.client.botAmmo);
					if (shotgunCheckGameOver(message.client.playerHealth, message.client.botHealth)){
						if (message.client.playerHealth == 0 && message.client.botHealth == 0){
							message.channel.send("We killed each other! We both lose.");
						} else if (message.client.playerHealth == 0){
							message.channel.send("You lose!");
						} else {
							message.channel.send("You win!");
						}
						
						shotgunStop();
					}
				} else {
					message.channel.send("You're not "+message.client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}
		}

		// Player blocks
		if (arguments[0] == "block"){
			if (message.client.shotgunGameEnabled){
				if (message.author.username === message.client.playerName){
					shotgunAISelectMove(message.client.playerAmmo, message.client.botAmmo);
					
					message.client.playerBlocked = true;
					message.channel.send("You block this turn.");
					
					shotgunAIPerformMove(message.client.botMoveNum, message.client.playerBlocked);
					shotgunResetBlocked();
					message.channel.send("Your Health: " + message.client.playerHealth + ",   Your Ammo: " + message.client.playerAmmo + "\nMy Health: " + message.client.botHealth + ",      My Ammo: " + message.client.botAmmo);
					if (shotgunCheckGameOver(message.client.playerHealth, message.client.botHealth)){
						if (message.client.playerHealth == 0 && message.client.botHealth == 0){
							message.channel.send("We killed each other! We both lose.");
						} else if (message.client.playerHealth == 0){
							message.channel.send("You lose!");
						} else {
							message.channel.send("You win!");
						}
						
						shotgunStop();
					}
				} else {
					message.channel.send("You're not "+message.client.playerName.avatar+"!");
				}
			} else {
				message.channel.send("There is no shotgun game in progress.");
			}
		}

		// Display help message in every other case
		return message.channel.send("help explanation goes here");
	},
};

function shotgunAISelectMove(pAmmo, bAmmo){
	if (pAmmo == 0 && bAmmo == 0){
		botMoveNum = 1;
	} else if (bAmmo == 0){
		if (Math.random() < 0.5){
			botMoveNum = 2;
			shotgunAIBlock();
		} else {
			botMoveNum = 1;
		}
	} else if (pAmmo == 0){
		if (Math.random() < 0.5){
			botMoveNum = 0;
		} else {
			botMoveNum = 1;
		}
	} else if (bAmmo >= 2){
		if (Math.random() < 0.5){
			botMoveNum = 0;
		} else {
			botMoveNum = 2;
			shotgunAIBlock();
		}
	} else {
		if (Math.random() < 0.3333333333333333){
			botMoveNum = 0;
		} else if (Math.random() < 0.66666666666666666){
			botMoveNum = 1;
		} else {
			botMoveNum = 2;
			shotgunAIBlock();
		}
	}
}

function shotgunAIPerformMove(moveNum, pBlocked){
	if (moveNum == 0){
		shotgunAIShoot(pBlocked);
	} else if (moveNum == 1){
		shotgunAIReload();
	} else {
		// this is done earlier in selectMove
		//shotgunAIBlock();
	}
}

function shotgunAIShoot(pBlocked){
	if (pBlocked){
		message.channel.send("I shoot!... but you blocked my bullet.");
	} else {
		playerHealth--;
		message.channel.send("I shoot!... and it hits! You lost some health.");
	}
	botAmmo--;
}

function shotgunAIReload(){
	botAmmo++;
	message.channel.send("I load in a bullet.");
}

function shotgunAIBlock(){
	botBlocked = true;
	message.channel.send("I block this turn.");
}

function shotgunResetBlocked(){
	playerBlocked = false;
	botBlocked = false;
}

function shotgunCheckGameOver(pHealth, bHealth){
	if (pHealth == 0 || bHealth == 0){
		return true;
	}
	return false;
}

function shotgunStop(){
	shotgunGameEnabled = false;
	shotgunTurnCounter = 0;
	playerName = null;
	playerHealth = 2;
	playerAmmo = 0;
	playerBlocked = false;
	botHealth = 2;
	botAmmo = 0;
	botBlocked = false;
	botMoveNum = -1;
}
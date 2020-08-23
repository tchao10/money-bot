const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const fs = require("fs");

const botStartupTime = new Date();
const botStartupTimeAsLocaleString = botStartupTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});
console.log("*****");
console.log("*****");
console.log("Starting up bot at " + botStartupTimeAsLocaleString + " PT...");

app.get("/", (request, response) => {
	console.log(Date.now() + " Ping Received");
	response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
	http.get("http://" + process.env.PROJECT_DOMAIN + ".glitch.me/");
}, 280000);

//============          VARIABLES          ====================================

// bot variables
const { prefix, globalCooldownAmount } = require("./config.json");
const client = new Discord.Client();

// donate variables
client.moneyCount = 0;

// shotgun variables
client.shotgunGameEnabled = false;
client.shotgunTurnCounter = 0;
client.playerName = null;
client.playerHealth = 2;
client.playerAmmo = 0;
client.playerBlocked = false;
client.botHealth = 2;
client.botAmmo = 0;
client.botBlocked = false;
client.botMoveNum = -1;

// uptime variables
client.botIsLiveTime; // ms of time of bot going live

//==============            "FUNCTIONS"           ===================================

// Creates commands based on .js file names in ./commands folder
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require("./commands/" + file);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Create a cooldowns collection for commands
const cooldowns = new Discord.Collection();



// Triggers when the bot is live
client.once("ready", () => {
	client.botIsLiveTime = new Date();
	var botIsLiveTimeAsLocaleString = client.botIsLiveTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});
    console.log("I am ready! Live as of " + botIsLiveTimeAsLocaleString + " PT.");
});

// Triggers on error 
client.on("error", (err) => {
  	console.error("Bot error:");
  	console.error(err);
});

// Triggers whenever a message is sent
client.on("message", message => {	
	// If the message author is a bot or if the message doesn't start with the prefix, then stop
	if (message.author.bot || !message.content.startsWith(prefix)){
		return;
	}

	// Splits users arguments after prefix
	const arguments = message.content.slice(prefix.length).trim().split(/ +/);

	// Gets first word after prefix using the arguments array
	const commandName = arguments.shift().toLowerCase();
	
	// Create the command, checking for aliases as well. But if a command isn't found, then stop
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command){
		return;
	}

	// Check if a command can only be used in a server (and not a DM)
	if (command.guildOnly && message.channel.type === "dm") {
		return message.reply("You cannot execute that command inside DMs.");
	}

	
	// Check cooldown of command of user
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || globalCooldownAmount) * 1000; // If command doesn't have a cooldown, set it to the globalCooldownAmount instead

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send("Please wait " + timeLeft.toFixed(1) + " more second(s) before reusing the `" + command.name + "` command.");
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	
	// Argument check, and show usage if it exists
	if (command.arguments && !arguments.length) {
		let reply = "You didn't provide any arguments.";

		if(command.usage){
			reply += "\nThe proper usage is: `" + prefix + command.name + " " + command.usage + "`";
		}

		return message.channel.send(reply);
	}

	
	// Execute the command
	try {
		command.execute(message, arguments);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});

//============          "MAIN FUNCTION"             ======================================

const botLoginTime = new Date();
const botLoginTimeAsLocaleString = botLoginTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});
console.log("Attempting bot login at " + botLoginTimeAsLocaleString + " PT...");
client.login(process.env.TOKEN).catch(console.error);
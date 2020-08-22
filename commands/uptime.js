module.exports = {
	name: "uptime",
	description: "Displays how long the bot has been up for.",
	usage: "No usage provided.",
	aliases: ["up"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments) {
		// Get botIsLiveTime from client
		const botIsLiveTime = message.client.botIsLiveTime;

		// Get current time
		var currentDate = new Date();

		// To supposedly handle times that are on opposite sides of midnight e.g. 9pm and 5am
		if (currentDate < botIsLiveTime){
			currentDate.setDate(currentDate.getDate() + 1);
		}

		// Get difference between times
		var differenceBetweenCurrentAndbotIsLiveTimes = currentDate - botIsLiveTime;

		var uptimeMilliseconds = differenceBetweenCurrentAndbotIsLiveTimes;

		var uptimeDays = Math.floor(uptimeMilliseconds / 1000 / 60 / 60 / 24);
		uptimeMilliseconds -= uptimeDays * 1000 * 60 * 60 * 24;

		var uptimeHours = Math.floor(uptimeMilliseconds / 1000 / 60 / 60);
		uptimeMilliseconds -= uptimeHours * 1000 * 60 * 60;

		var uptimeMinutes = Math.floor(uptimeMilliseconds / 1000 / 60);
		uptimeMilliseconds -= uptimeMinutes * 1000 * 60;
		
		var uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
		uptimeMilliseconds -= uptimeSeconds * 1000;

		var botIsLiveTimeLocaleString = botIsLiveTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});

		message.channel.send("**Uptime:** " + uptimeDays + " days, " + uptimeHours + " hours, " + uptimeMinutes + " minutes, " + uptimeSeconds + " seconds, and " + uptimeMilliseconds + " milliseconds\n**Last restart time:** " + botIsLiveTimeLocaleString + " PT");
	},
};
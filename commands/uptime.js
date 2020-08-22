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

		console.log(botIsLiveTime);

		// Get time since botIsLiveTime
		var currentDate = new Date();

		// To supposedly handle times that are on opposite sides of midnight e.g. 9pm and 5am
		if (currentDate < botIsLiveTime){
			currentDate.setDate(currentDate.getDate() + 1);
		}

		var differenceBetweenCurrentAndbotIsLiveTimes = currentDate - botIsLiveTime;

		var msec = differenceBetweenCurrentAndbotIsLiveTimes;
		var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
		msec -= dd * 1000 * 60 * 60 * 24;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		var ss = Math.floor(msec / 1000);
		msec -= ss * 1000;

		var botIsLiveTimeLocaleString = botIsLiveTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});

		message.channel.send("**Uptime:** " + dd + " days, " + hh + " hours, " + mm + " minutes, " + ss + " seconds, and " + msec + " milliseconds\n**Last restart time:** " + botIsLiveTimeLocaleString + " PT");
	},
};
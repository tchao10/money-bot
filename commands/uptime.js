module.exports = {
	name: 'uptime',
	description: 'Displays how long the bot has been up for.',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
		// Get time since botIsLiveTime
		var currentDate = new Date();

		// To supposedly handle times that are on opposite sides of midnight e.g. 9pm and 5am
		if (currentDate < botIsLiveTime){
			currentDate.setDate(currentDate.getDate() + 1);
		}

		var differenceBetweenCurrentAndbotIsLiveTimes = currentDate - botIsLiveTime;

		var msec = differenceBetweenCurrentAndbotIsLiveTimes;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		var ss = Math.floor(msec / 1000);
		msec -= ss * 1000;

		var botIsLiveTimeLocaleString = botIsLiveTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});

		message.channel.send("**Uptime**: " + hh + " hours, " + mm + " minutes, " + ss + " seconds, and " + msec + " milliseconds\n**Last restart time**: " + botIsLiveTimeLocaleString + " PST");
	},
};
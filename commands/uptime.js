module.exports = {
	name: 'uptime',
	description: 'Uptime',
	execute(message, args) {
		// Get time since restartTime
		var currentDate = new Date();

		// To supposedly handle times that are on opposite sides of midnight e.g. 9pm and 5am
		if (currentDate < restartTime){
			currentDate.setDate(currentDate.getDate() + 1);
		}

		var differenceBetweenCurrentAndRestartTimes = currentDate - restartTime;

		var msec = differenceBetweenCurrentAndRestartTimes;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		var ss = Math.floor(msec / 1000);
		msec -= ss * 1000;

		var restartTimeLocaleString = restartTime.toLocaleString("en-US", {timeZone: "America/Los_Angeles",});

		message.channel.send("**Uptime**: " + hh + " hours, " + mm + " minutes, " + ss + " seconds, and " + msec + " milliseconds\n**Last restart time**: " + restartTimeLocaleString + " PST");
	},
};
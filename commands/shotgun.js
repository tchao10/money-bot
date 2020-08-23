module.exports = {
	name: "shotgun",
	description: "Starts a shotgun game.",
	usage: "",
	aliases: ["sg"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments) {
		message.reply("Need to move shotgun to `shotgun.js`");
		
		const filter = (reaction, user) => {
			return reaction.emoji.name === '👍' && user.id === message.author.id;
		};
		
		message.awaitReactions(filter, { max: 4, time: 60000, errors: ['time'] })
			.then(collected => console.log(collected.size))
			.catch(collected => {
				console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
			});
	},
};
module.exports = {
	name: 'help',
	description: 'Displays a list of commands.',
	usage: "No usage provided.",
	aliases: ["commands"],
	args: false,
	guildOnly: false,
	execute(message, args) {
        message.reply("here is a list of commands: $help, $ping, $donate, $uno, $weather, $pls meme, $coinflip, $spamunobot, $play <songName/URL>, $leave, $shotgun, $uptime");
	},
};
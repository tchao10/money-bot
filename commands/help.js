module.exports = {
	name: 'help',
	description: 'Help',
	usage: "No usage provided.",
	aliases: [],
	args: false,
	guildOnly: false,
	execute(message, args) {
        message.reply("here is a list of commands: $help, $ping, $donate, $uno, $weather, $pls meme, $coinflip, $spamunobot, $play <songName/URL>, $leave, $shotgun, $uptime");
	},
};
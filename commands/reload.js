// https://discordjs.guide/command-handling/adding-features.html#reloading-commands

module.exports = {
	name: "reload",
	description: "Reloads a command.",
	usage: "[command name]",
	aliases: ["rl"],
	arguments: true,
	guildOnly: false,
	execute(message, arguments) {
        if (message.author.id != 134095374381088768){ // If you are not me
            return message.channel.send("Insufficient permissions.");
        }

        const commandName = arguments[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command){
            return message.channel.send("There is no command with name or alias `" + commandName + "`, <@" + message.author + ">!");
        }
    
        delete require.cache[require.resolve("./" + command.name + ".js")];

        try {
            const newCommand = require("./" + command.name + ".js");
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send("Command `" + command.name + "` was reloaded!");
        } catch (error) {
            console.log(error);
            message.channel.send("There was an error while reloading a command `" + command.name + "`:\n`" + error.message + "`");
        }
    },
};
module.exports = {
	name: "userinfo",
	description: "Displays a user's info.",
	usage: "@username (optional)",
	aliases: ["ui"],
	arguments: false,
	guildOnly: false,
	execute(message, arguments){
        const userInfoArray = [];

		// If the first argument is a mentioned user, then show the mentioned user's info
        if (arguments.length && message.mentions.users.first().id == arguments[0].replace(/\D/g,'')){ // the replace removes all non-numeric characters
            const mentionedUser = message.mentions.users.first();

            userInfoArray.push("**__Information about " + mentionedUser.toString() + "__**");
            userInfoArray.push("**mentionedUser (Object, but prints as mentionedUser.id):** " + mentionedUser);
            //userInfoArray.push("**mentionedUser.avatar:** " + mentionedUser.avatar);
            //userInfoArray.push("**mentionedUser.bot:** " + mentionedUser.bot);
            //userInfoArray.push("**mentionedUser.client:** " + mentionedUser.client);
            userInfoArray.push("**mentionedUser.createdAt:** " + mentionedUser.createdAt);
            userInfoArray.push("**mentionedUser.createdTimestamp:** " + mentionedUser.createdTimestamp);
            userInfoArray.push("**mentionedUser.defaultAvatarURL:** <" + mentionedUser.defaultAvatarURL + ">");
            userInfoArray.push("**mentionedUser.discriminator:** " + mentionedUser.discriminator);
            //userInfoArray.push("**mentionedUser.dmChannel:** " + mentionedUser.dmChannel);
            userInfoArray.push("**mentionedUser.flags:** " + mentionedUser.flags);
            userInfoArray.push("**mentionedUser.id:** " + mentionedUser.id);
            userInfoArray.push("**mentionedUser.lastMessage (Object, but prints as lastMessageID):** " + mentionedUser.lastMessage);
            userInfoArray.push("**mentionedUser.lastMessageChannelID:** " + mentionedUser.lastMessageChannelID);
            userInfoArray.push("**mentionedUser.lastMessageID:** " + mentionedUser.lastMessageID);
            //userInfoArray.push("**mentionedUser.locale:** " + mentionedUser.locale);
            //userInfoArray.push("**mentionedUser.partial:** " + mentionedUser.partial);
            //userInfoArray.push("**mentionedUser.presence:** " + mentionedUser.presence);
            //userInfoArray.push("**mentionedUser.system:** " + mentionedUser.system);
            userInfoArray.push("**mentionedUser.tag:** " + mentionedUser.tag);
            userInfoArray.push("**mentionedUser.username:** " + mentionedUser.username);
            userInfoArray.push("**mentionedUser.avatarURL():** <" + mentionedUser.avatarURL() + ">");
            userInfoArray.push("**mentionedUser.displayAvatarURL():** <" + mentionedUser.displayAvatarURL() + ">");
            //userInfoArray.push("**mentionedUser.fetch():** " + mentionedUser.fetch());
            //userInfoArray.push("**mentionedUser.fetchFlags():*8 " + mentionedUser.fetchFlags());
            //userInfoArray.push("**mentionedUser.send():** " + mentionedUser.send());
            userInfoArray.push("**mentionedUser.toString():** " + mentionedUser.toString());
            
            return message.channel.send(userInfoArray);
		}
        
        // Otherwise, just show the author's info (this also takes care of "garbage" arguments)
        userInfoArray.push("**__Information about " + message.author.toString() + "__**\n");
        userInfoArray.push("**message.author (Object, but prints as author.id):** " + message.author);
        //userInfoArray.push("**message.author.avatar:** " + message.author.avatar);
        //userInfoArray.push("**message.author.bot:** " + message.author.bot);
        //userInfoArray.push("**message.author.client:** " + message.author.client);
        userInfoArray.push("**message.author.createdAt:** " + message.author.createdAt);
        userInfoArray.push("**message.author.createdTimestamp:** " + message.author.createdTimestamp);
        userInfoArray.push("**message.author.defaultAvatarURL:** <" + message.author.defaultAvatarURL + ">");
        userInfoArray.push("**message.author.discriminator:** " + message.author.discriminator);
        //userInfoArray.push("**message.author.dmChannel:** " + message.author.dmChannel);
        userInfoArray.push("**message.author.flags:** " + message.author.flags);
        userInfoArray.push("**message.author.id:** " + message.author.id);
        userInfoArray.push("**message.author.lastMessage (Object, but prints as lastMessageID):** " + message.author.lastMessage);
        userInfoArray.push("**message.author.lastMessageChannelID:** " + message.author.lastMessageChannelID);
        userInfoArray.push("**message.author.lastMessageID:** " + message.author.lastMessageID);
        //userInfoArray.push("**message.author.locale:** " + message.author.locale);
        //userInfoArray.push("**message.author.partial:** " + message.author.partial);
        //userInfoArray.push("**message.author.presence:** " + message.author.presence);
        //userInfoArray.push("**message.author.system:** " + message.author.system);
        userInfoArray.push("**message.author.tag:** " + message.author.tag);
        userInfoArray.push("**message.author.username:** " + message.author.username);
        userInfoArray.push("**message.author.avatarURL():** <" + message.author.avatarURL() + ">");
        userInfoArray.push("**message.author.displayAvatarURL():** <" + message.author.displayAvatarURL() + ">");
        //userInfoArray.push("**message.author.fetch():** " + message.author.fetch());
        //userInfoArray.push("**message.author.fetchFlags():*8 " + message.author.fetchFlags());
        //userInfoArray.push("**message.author.send():** " + message.author.send());
        userInfoArray.push("**message.author.toString():** " + message.author.toString());
        
        return message.channel.send(userInfoArray);
	},
};

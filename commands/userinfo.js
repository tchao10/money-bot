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

            userInfoArray.push("**__Information about " + mentionedUser.toString() + "__**\n");
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
        userInfoArray.push("**author (Object, but prints as author.id):** " + message.author);
        //userInfoArray.push("**author.avatar:** " + message.author.avatar);
        //userInfoArray.push("**author.bot:** " + message.author.bot);
        //userInfoArray.push("**author.client:** " + message.author.client);
        userInfoArray.push("**author.createdAt:** " + message.author.createdAt);
        userInfoArray.push("**author.createdTimestamp:** " + message.author.createdTimestamp);
        userInfoArray.push("**author.defaultAvatarURL:** <" + message.author.defaultAvatarURL + ">");
        userInfoArray.push("**author.discriminator:** " + message.author.discriminator);
        //userInfoArray.push("**author.dmChannel:** " + message.author.dmChannel);
        userInfoArray.push("**author.flags:** " + message.author.flags);
        userInfoArray.push("**author.id:** " + message.author.id);
        userInfoArray.push("**author.lastMessage (Object, but prints as lastMessageID):** " + message.author.lastMessage);
        userInfoArray.push("**author.lastMessageChannelID:** " + message.author.lastMessageChannelID);
        userInfoArray.push("**author.lastMessageID:** " + message.author.lastMessageID);
        //userInfoArray.push("**author.locale:** " + message.author.locale);
        //userInfoArray.push("**author.partial:** " + message.author.partial);
        //userInfoArray.push("**author.presence:** " + message.author.presence);
        //userInfoArray.push("**author.system:** " + message.author.system);
        userInfoArray.push("**author.tag:** " + message.author.tag);
        userInfoArray.push("**author.username:** " + message.author.username);
        userInfoArray.push("**author.avatarURL():** <" + message.author.avatarURL() + ">");
        userInfoArray.push("**author.displayAvatarURL():** <" + message.author.displayAvatarURL() + ">");
        //userInfoArray.push("**author.fetch():** " + message.author.fetch());
        //userInfoArray.push("**author.fetchFlags():*8 " + message.author.fetchFlags());
        //userInfoArray.push("**author.send():** " + message.author.send());
        userInfoArray.push("**author.toString():** " + message.author.toString());
        
        return message.channel.send(userInfoArray);
	},
};

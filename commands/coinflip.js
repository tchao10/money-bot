module.exports = {
	name: 'coinflip',
	description: 'Coinflip',
	execute(message, args) {
		var randNum = Math.random();
    
		if (randNum < 0.45){
			message.channel.send('Heads.');
		} else if (randNum < 0.55){
			message.channel.send('oops i dropped the coin');
		} else {
			message.channel.send('Tails.');
		}
	},
};
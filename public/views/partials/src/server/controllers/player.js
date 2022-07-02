class PlayerController {
	constructor() {}
	
	init(app, socket) {
		socket.on('player-creation', async () => {
			const backstory = app.utils.generateBackstory();

			socket.emit('player-creation-response', backstory);
		});

		socket.on('player-create', async (input) => {
			let status = 'error';
			const result = app.services.player.create(input);
			if(result){
				status = 'ok';
			}

			socket.emit('player-create-response', {status: status});
		});
	}
}

module.exports = new PlayerController();



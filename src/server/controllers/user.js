class UserController {
	constructor() {}
	
	init(app, socket) {
		socket.on('user-login', async (input) => {
			const data = {
				username: input.username,
				password: input.password
			};
			
			const result = await app.services.user.login(data);
			
			if(result.status == 'ok'){
				socket.request.session.reload((err) => {
					if(err){
						return socket.disconnect();
					}
					socket.request.session.User = result.data;
					socket.request.session.save();
				});
			}
			socket.emit('user-login-response', result);
		});
		
		socket.on('user-register', async (input) => {
			const data = {
				username: input.username,
				email: input.email,
				password: input.password
			};
			
			const createResult = await app.services.user.create(data);
			
			socket.emit('user-register-response', createResult);
		});
	}
}

module.exports = new UserController();



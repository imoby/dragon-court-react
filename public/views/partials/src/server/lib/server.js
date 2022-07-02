const http = require('http');

class AppServer {
	constructor(app) {
		this.app = app;
		
		this.server = http.createServer(this.app.expressApp);
	}
	
	start(port) {
		this.server.listen(port, () => {
			this.app.log('Application running on localhost: '+port);
		});
	}
}

module.exports = (app) => {
	return new AppServer(app);
};

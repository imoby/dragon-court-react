const fs = require('fs'),
	handlebars = require('handlebars');

class Template {
	constructor(core){
		this.core = core;
	}
	
	async build(data) {
		const html = await fs.promises.readFile('views/partials/'+html+'.html', 'UTF8');
		const template = handlebars.compile(html);
		return template(data.data);
	}
}

module.exports = (app) => {
	return new Template(app);
};

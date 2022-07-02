class RegionService {
	constructor(app){
		this.app = app;
	}
	
	async getRegion(id) {
		const query = 'SELECT * FROM regions WHERE slug = ?';
		const results = await this.app.db.query(query, [id]);
		
		return {
			id: results[0].id,
			name: results[0].name,
			slug: results[0].slug,
			lvl: results[0].lvl
		};
	}
}

module.exports = (app) => {
  return new RegionService(app);
};


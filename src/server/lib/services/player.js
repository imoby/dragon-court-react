class PlayerService {
	constructor(app) {
 		this.app = app;
	}
	
	async create(data) {
		data.rank = 0;
		data.skillFighter = 0;
		data.skillMagic = 0;
		data.skillTrade = 0;
		
		switch(data.charClass){
			default:
			case 'peasant':
			break;
			
			case 'noble':
				data.rank = 1;
			break;
			
			case 'warrior':
				data.skillFighter = 1;
			break;
			
			case 'wizard':
				data.skillMagic = 1;
			break;
			
			case 'trader':
				data.skillTrade = 1;
			break;
		}
		
		const query = "INSERT INTO players (owner,region,class,background,guild,effects,guts,max_guts,wits,max_wits,charm,max_charm,attack,defend,skill,skill_fighter,skill_fighter_max,skill_magic,skill_magic_max,skill_trade,skill_trade_max,level,experience,quests,max_quests,cash,rank,storage,max_storage,fame,favor,skilled) VALUES (?,'town','?','?',0,'',?,?,?,?,?,?,1,1,4,?,?,?,?,?,?,1,0,5,5,?,?,0,20,0,0,0)";
		const results = await this.app.db.query(query, [data.owner, data.class, data.bg, data.guts, data.guts, data.wits, data.wits, data.charm, data.charm, data.skillFighter, data.skillFighter, data.skillMagic, data.skillMagic, data.skillTrade, data.skillTrade, data.cash, data.rank]);
		if(results.affectedRows){
			const q = 'UPDATE users SET has_char = 1 WHERE id = ?';
			await this.app.db.query(q, [data.owner]);
			return true;
		}else{
			return false;
		}
	}
	
	getRankString(rank) {
		let title = '';
		
		switch(rank){
			default:
   		case 0:
    		title = "Peasant";
    	break;
   		case 1:
    		title = "Squire";
    	break;
   		case 2:
    		title = "Knight";
    	break;
   		case 3:
    		title = "Captain";
    	break;
   		case 4:
    		title = "Baron";
    	break;
   		case 5:
    		title = "Count";
    	break;
   		case 6:
    		title = "Viscount";
    	break;
   		case 7:
    		title = "Marquis";
    	break;
   		case 8:
    		title = "Earl";
    	break;
   		case 9:
    		title = "Duke";
    	break;
   		case 10:
    		title = "Prince";
    	break;
   		case 11:
    		title = "Viceroy";
    	break;
   		case 12:
    		title = "Regent";
    	break;
   		case 13:
    		title = "Seneschal";
    	break;
		}
		
		return title;
	}
	
	async getPlayer(id) {
		let json = {};
		const query = 'SELECT * FROM players WHERE owner = ?';
		const results = await this.app.db.query(query, [id]);
		if(results.length > 0){
			const data = results[0];
			data.rankString = this.getRankString(data.rank);
			
			json = {
				status: 'ok',
				data: data
			};
		}else{
			json = {
				status: 'error',
				message: 'Could not get player data.'
			}
		}

		return json;
	}
	
	async update(data) {
		const query = 'UPDATE players SET region = ?, char_class = ?, background = ?, guild = ?, effects = ?, guts = ?, wits = ?, charm = ?, max_guts = ?, max_wits = ?, max_charm = ?, attack = ?, defend = ?, skill = ?, skill_fighter = ?, skill_fighter_max = ?, skill_magic = ?, skill_magic_max = ?, skill_trade = ?, skill_trade_max = ?, level = ?, experience = ?, quests = ?, max_quests = ?, cash = ?, rank = ?, storage = ?, max_storage = ?, fame = ?, favor = ?, skilled = ? WHERE owner = ?';
		return await this.app.db.query(query, [data.region, data.charClass, data.background, data.guild, data.affects, data.stats.guts, data.stats.wits, data.stats.charm, data.stats.gutsMax, data.stats.witsMax, data.stats.charmMax, data.stats.attack, data.stats.defend, data.stats.skill, data.skills.fighter.skill, data.skills.fighter.max, data.skills.magic.skill, data.skills.magic.max, data.skills.trade.skill, data.skills.trade.max, data.level, data.experience, data.quests, data.questsMax, data.cash, data.rank, data.storage, data.storageMax, data.fame, data.favor, data.skilled, data.owner]);
	}
}

module.exports = (app) => {
  return new PlayerService(app);
}


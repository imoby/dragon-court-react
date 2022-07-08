class PlayerService {
  constructor(app) {
    this.app = app;
  }

  async create(data) {
    data.rank = 0;
    data.skillFighter = 0;
    data.skillMagic = 0;
    data.skillTrade = 0;

    switch (data.charClass) {
      default:
      case "peasant":
        break;

      case "noble":
        data.rank = 1;
        break;

      case "warrior":
        data.skillFighter = 1;
        break;

      case "wizard":
        data.skillMagic = 1;
        break;

      case "trader":
        data.skillTrade = 1;
        break;
    }

    const query =
      "INSERT INTO players (owner,region,class,background,alliance,effects,guts,max_guts,wits,max_wits,charm,max_charm,attack,defend,skill,skill_fighter,skill_fighter_max,skill_magic,skill_magic_max,skill_trade,skill_trade_max,level,experience,quests,max_quests,cash,rank,storage,max_storage,fame,favor,skilled,place,location) VALUES (?,'town',?,?,0,'',?,?,?,?,?,?,1,1,4,?,?,?,?,?,?,1,0,5,5,?,?,0,20,0,0,0,'','')";
    const results = await this.app.db.query(query, [
      data.owner,
      data.class,
      data.bg,
      data.guts,
      data.guts,
      data.wits,
      data.wits,
      data.charm,
      data.charm,
      data.skillFighter,
      data.skillFighter,
      data.skillMagic,
      data.skillMagic,
      data.skillTrade,
      data.skillTrade,
      data.cash,
      data.rank,
    ]);
    if (results.affectedRows) {
      const q = "UPDATE users SET has_char = 1 WHERE id = ?";
      await this.app.db.query(q, [data.owner]);
      return true;
    } else {
      return false;
    }
  }

  getRankString(rank) {
    let title = "";

    switch (rank) {
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

  getEquipped(items, location) {
    return items.find((obj) => {
      return obj.func.toLowerCase().includes(location.toLowerCase());
    });
  }

  async getPlayer(id) {
    let json = {};
    const query = "SELECT * FROM players WHERE owner = ?";
    const results = await this.app.db.query(query, [id]);
    if (results.length > 0) {
      const data = results[0];
      let skilled = 0;
      let totalSkills = 0;
      if (data.skill_fighter || data.skill_magic || data.skill_trade) {
        skilled = 1;
        totalSkills = data.skill_fighter + data.skill_magic + data.skill_trade;
      }
      data.skilled = skilled;
      data.totalGuildSkills = totalSkills;
      data.rankString = this.getRankString(data.rank);
      data.inventory = await this.getInventory(id);

      let guts = 0,
        wits = 0,
        charm = 0,
        attack = 0,
        defend = 0;

      const equipment = await this.getEquipment(id);
      for (const itm of equipment) {
        guts += itm.guts;
        wits += itm.wits;
        charm += itm.charm;
        attack += itm.attack;
        defend += itm.defend;
      }

      data.equipment = {
        head: JSON.stringify(this.getEquipped(equipment, "head")),
        body: JSON.stringify(this.getEquipped(equipment, "body")),
        feet: JSON.stringify(this.getEquipped(equipment, "feet")),
        left: JSON.stringify(this.getEquipped(equipment, "left")),
        right: JSON.stringify(this.getEquipped(equipment, "right")),
      };

      data.totalGuts = guts;
      data.totalWits = wits;
      data.totalCharm = charm;
      data.totalAttack = attack;
      data.totalDefend = defend;

      json = {
        status: "ok",
        data: data,
      };
    } else {
      json = {
        status: "error",
        message: "Could not get player data.",
      };
    }

    return json;
  }

  async getInventory(id) {
    const query =
      "SELECT i.name, i.region, i.shop, i.guts AS itmGuts, i.wits AS itmWits, i.charm AS itmCharm, i.attack AS itmAttack, i.defend AS itmDefend, i.skill AS itmSkill, i.cost, i.func, i.equippable, i.max_enchants, i.lvl, i.is_silver, i.is_crystal, pi.id, pi.item, pi.qty, pi.equipped, pi.identified, pi.abilities, pi.guts, pi.wits, pi.charm, pi.attack, pi.defend, pi.skill, pi.times_enchanted, pi.in_storage, pi.lvl AS itmLvl FROM player_items pi INNER JOIN items i on pi.item = i.id WHERE pi.player = ? AND pi.equipped = 0";
    const results = await this.app.db.query(query, [id]);

    return Promise.all(
      results.map((result) => {
        const data = {
          id: result.id,
          itmId: result.item,
          region: result.region,
          shop: result.shop,
          baseGuts: result.itmGuts,
          baseWits: result.itmWits,
          baseCharm: result.itmCharm,
          baseAttack: result.itmAttack,
          baseDefend: result.itmDefend,
          baseSkill: result.itmSkill,
          cost: result.cost,
          func: result.func,
          equippable: result.equippable,
          maxEnchants: result.max_enchants,
          isSilver: result.is_silver,
          isCrystal: result.is_crystal,
          qty: result.qty,
          equipped: result.equipped,
          identified: result.identified,
          abilities: result.abilites,
          guts: result.guts,
          wits: result.wits,
          charm: result.charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
          timesEnchanted: result.times_enchanted,
          inStorage: result.in_storage,
          requiredLevel: result.lvl,
          itemLevel: result.itmLevel,
        };

        return data;
      })
    );
  }

  async getEquipment(id) {
    const query =
      "SELECT i.name, i.region, i.shop, i.guts AS itmGuts, i.wits AS itmWits, i.charm AS itmCharm, i.attack AS itmAttack, i.defend AS itmDefend, i.skill AS itmSkill, i.cost, i.func, i.equippable, i.max_enchants, i.lvl, i.is_silver, i.is_crystal, pi.id, pi.item, pi.qty, pi.equipped, pi.identified, pi.abilities, pi.guts, pi.wits, pi.charm, pi.attack, pi.defend, pi.skill, pi.times_enchanted, pi.in_storage, pi.lvl AS itmLvl FROM player_items pi INNER JOIN items i on pi.item = i.id WHERE pi.player = ? AND pi.equipped = 1";
    const results = await this.app.db.query(query, [id]);

    return Promise.all(
      results.map((result) => {
        const data = {
          id: result.id,
          itmId: result.item,
          region: result.region,
          shop: result.shop,
          baseGuts: result.itmGuts,
          baseWits: result.itmWits,
          baseCharm: result.itmCharm,
          baseAttack: result.itmAttack,
          baseDefend: result.itmDefend,
          baseSkill: result.itmSkill,
          cost: result.cost,
          func: result.func,
          equippable: result.equippable,
          maxEnchants: result.max_enchants,
          isSilver: result.is_silver,
          isCrystal: result.is_crystal,
          qty: result.qty,
          equipped: result.equipped,
          identified: result.identified,
          abilities: result.abilites,
          guts: result.guts,
          wits: result.wits,
          charm: result.charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
          timesEnchanted: result.times_enchanted,
          inStorage: result.in_storage,
          requiredLevel: result.lvl,
          itemLevel: result.itmLevel,
        };

        return data;
      })
    );
  }

  async addInventoryItem(item) {
    const query =
      "INSERT INTO player_items SET pi_item = ?, pi_player = ?, pi_qty = ?, pi_equipped = ?, pi_identified = ?, pi_abilities = ?, pi_guts = ?, pi_wits = ?, pi_charm = ?, pi_attack = ?, pi_defend = ?, pi_skill = ?, pi_times_enchanted = ?, pi_in_storage = ?";
    const results = await this.app.db.query(query, [
      item.id,
      global.Player.owner,
      item.qty,
      item.equipped,
      item.identified,
      item.abilities,
      item.guts,
      item.wits,
      item.charm,
      item.attack,
      item.defend,
      item.skill,
      item.timesEnchanted,
      item.inStorage,
    ]);
    //return await this.getInventory(global.Player.owner);
  }

  async update(data) {
    const query =
      "UPDATE players SET region = ?, char_class = ?, background = ?, alliance = ?, effects = ?, guts = ?, wits = ?, charm = ?, max_guts = ?, max_wits = ?, max_charm = ?, attack = ?, defend = ?, skill = ?, skill_fighter = ?, skill_fighter_max = ?, skill_magic = ?, skill_magic_max = ?, skill_trade = ?, skill_trade_max = ?, level = ?, experience = ?, quests = ?, max_quests = ?, cash = ?, rank = ?, storage = ?, max_storage = ?, fame = ?, favor = ?, skilled = ?, place = ?, location = ? WHERE owner = ?";
    return await this.app.db.query(query, [
      data.region,
      data.charClass,
      data.background,
      data.alliance,
      data.affects,
      data.stats.guts,
      data.stats.wits,
      data.stats.charm,
      data.stats.gutsMax,
      data.stats.witsMax,
      data.stats.charmMax,
      data.stats.attack,
      data.stats.defend,
      data.stats.skill,
      data.skills.fighter.skill,
      data.skills.fighter.max,
      data.skills.magic.skill,
      data.skills.magic.max,
      data.skills.trade.skill,
      data.skills.trade.max,
      data.level,
      data.experience,
      data.quests,
      data.questsMax,
      data.cash,
      data.rank,
      data.storage,
      data.storageMax,
      data.fame,
      data.favor,
      data.skilled,
      data.place,
      data.location,
      data.owner,
    ]);
  }
}

module.exports = (app) => {
  return new PlayerService(app);
};

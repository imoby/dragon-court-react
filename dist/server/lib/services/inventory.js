class InventoryService {
  constructor(app) {
    this.app = app;
  }

  async getInventory(id) {
    const query = 'SELECT i.*, pi.* FROM player_items pi INNER JOIN items i on pi.pi_item = i.id WHERE pi.pi_player = ?';
    const results = await this.app.db.query(query, [id]);
    return Promise.all(results.map(result => {
      const data = {
        id: result.pi_id,
        item: result.pi_item,
        qty: result.pi_qty,
        equipped: result.pi_equipped,
        identified: result.pi_identified,
        abilities: result.pi_abilities,
        timesEnchanted: result.pi_times_enchanted,
        inStorage: result.pi_in_storage,
        name: result.name,
        region: result.region,
        shop: result.shop,
        funcs: result.funcs,
        effects: result.effects,
        cost: result.cost,
        equippable: result.equippable,
        level: result.lvl,
        maxEnchants: result.max_enchants,
        dropRate: result.drop_rate,
        isSilver: result.is_silver,
        isCrystal: result.is_crystal
      };
      return data;
    }));
  }

  async add(item) {
    const query = 'INSERT INTO player_items SET pi_item = ?, pi_player = ?, pi_qty = ?, pi_equipped = ?, pi_identified = ?, pi_abilities = ?, pi_guts = ?, pi_wits = ?, pi_charm = ?, pi_attack = ?, pi_defend = ?, pi_skill = ?, pi_times_enchanted = ?, pi_in_storage = ?';
    const results = await this.app.db.query(query, [item.id, global.Player.owner, item.qty, item.equipped, item.identified, item.abilities, item.guts, item.wits, item.charm, item.attack, item.defend, item.skill, item.timesEnchanted, item.inStorage]);
    return await this.getInventory(global.Player.owner);
  }

  remove(item) {}

}

module.exports = app => {
  return new InventoryService(app);
};
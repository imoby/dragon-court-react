class ShopService {
  constructor(app) {
    this.app = app;
  }

  async getItems() {
    const query = "SELECT * FROM items";
    const results = await this.app.db.query(query);

    return Promise.all(
      results.map(async (result) => {
        const item = {
          id: result.id,
          name: result.name,
          region: result.region,
          shop: result.shop,
          guts: result.guts,
          wits: result.wits,
          charm: result.charm,
          attack: result.attack,
          defend: result.defend,
          skill: result.skill,
          cost: result.cost,
          func: result.func,
          equippable: result.equippable,
          qty: 1000,
          lvl: result.lvl,
          equipped: false,
          identified: true,
          abilities: "",
          max_enchants: result.max_enchants,
          times_enchanted: 0,
          in_storage: 0,
          drop_rate: result.drop_rate,
          is_silver: result.is_silver,
          is_crystal: result.is_crystal,
        };

        return item;
      })
    );
  }

  async buy(item) {
    global.Player.cash = global.Player.cash - item.cost;
    await this.app.services.player.update(global.Player);
    return await this.app.services.inventory.add(item);
  }

  sell(data) {
    const uid = data.id,
      item = data.itm;

    console.log(item);
  }

  polish(data) {
    const uid = data.id,
      item = data.itm;

    console.log(item);
  }

  identify(data) {
    const uid = data.id,
      item = data.itm;

    console.log(item);
  }
}

module.exports = (app) => {
  return new ShopService(app);
};

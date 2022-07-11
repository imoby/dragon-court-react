class BuildingController {
  constructor() {}

  init(app, socket) {
    socket.on("shop-items-get", async (input) => {
      const result = await app.services.item.getAll(input.type);

      socket.emit("sop-items-get-response", result);
    });
  }
}

module.exports = new BuildingController();

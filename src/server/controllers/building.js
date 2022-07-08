class BuildingController {
  constructor() {}

  init(app, socket) {
    socket.on("building-get", async (input) => {
      let status = "error";
      const result = await app.services.player.create(input);
      if (result) {
        status = "ok";
      }

      socket.emit("building-get-response", { status: status });
    });

    socket.on("building-get", async (input) => {
      const result = await app.services.player.getPlayer(input.id);

      socket.emit("player-get-response", result);
    });
  }
}

module.exports = new PlayerController();

class EncounterController {
  constructor() {}

  init(app, socket) {
    socket.on("quest-init", async (input) => {
      const creature = app.services.encounter.getEncounter(input.region);

      socket.emit("quest-init-response", {
        creature: creature,
      });
    });
  }
}

module.exports = new EncounterController();

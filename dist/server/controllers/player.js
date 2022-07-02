class PlayerController {
  constructor() {}

  init(app, socket) {
    socket.on('player-creation', async () => {
      const backstory = app.utils.generateBackstory();
      socket.emit('player-creation-response', backstory);
    });
  }

}

module.exports = new PlayerController();
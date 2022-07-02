class ChatService {
  constructor(app) {
    this.app = app;
  }

  async init(channel) {
    const now = this.app.utils.getEpochTime();
    const then = now - 3600;
    const query = 'SELECT c.*, u.name FROM chat c LEFT JOIN users us ON sender = u.id WHERE channel = ? AND time BETWEEN ? AND ?';
    const results = await this.app.db.query(query, [channel, then, now]);
    return Promise.all(results.map(result => {
      const data = {
        date: this.app.utils.getShortDate(results[0].time),
        channel: results[0].channel,
        author: {
          id: results[0].sender,
          name: results[0].name
        },
        message: results[0].message
      };
      return data;
    }));
  }

  async insert(message) {
    const date = this.app.utils.getEpochTime();
    const query = 'INSERT INTO chat (sender, time, channel, message) VALUES (?, ?, ?, ?)';
    const results = await this.app.db.query(query, [global.User.id, date, global.User.chat, message]);
    return {
      date: this.app.utils.getShortDate(date),
      channel: global.User.chat,
      author: {
        id: global.User.id,
        name: global.User.name
      },
      message: message
    };
  }

}

module.exports = app => {
  return new ChatService(app);
};
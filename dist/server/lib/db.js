const mysql = require('mysql2/promise');

require('dotenv').config({
  path: '/var/www/dc/html/.env'
});

class Database {
  constructor() {
    this.pool = null;
  }

  async initialize() {
    this.pool = await mysql.createPool({
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306
    });
    return this;
  }

  async query(sql, values = null) {
    let results;

    if (values == null) {
      results = await this.pool.query(sql);
    } else {
      results = await this.pool.query(sql, values);
    }

    return results[0];
  }

  escape(str) {
    return mysql.escape(str);
  }

}

module.exports = new Database();
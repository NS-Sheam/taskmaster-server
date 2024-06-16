const mysql = require("mysql");
const config = require("../config");
const db = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

module.exports = {
  db,
  queryAsync: async (query, values = []) => {
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  dbChangeUserAsync: async (config) => {
    return new Promise((resolve, reject) => {
      db.changeUser(config, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};

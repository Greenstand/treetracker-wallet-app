const fs = require("fs");
const path = require("path");

function readFileAsText(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

exports.up = async function (db) {
  const filePath = path.join(
    __dirname,
    "sqls",
    "20260429000000-CreateQueueSchema-up.sql",
  );
  const sql = await readFileAsText(filePath);
  return db.runSql(sql);
};

exports.down = async function (db) {
  const filePath = path.join(
    __dirname,
    "sqls",
    "20260429000000-CreateQueueSchema-down.sql",
  );
  const sql = await readFileAsText(filePath);
  return db.runSql(sql);
};

exports._meta = { version: 1 };

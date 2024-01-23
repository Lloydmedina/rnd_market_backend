const express = require("express");
const router = express.Router();
const db = require("../config/market_connect");
const table = 'inspect_logs';
async function getAll (req, res) {
  try {
    const queryString = `SELECT * FROM ${table}`;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}


async function findOne(req, res) {
  const id = req.params.id;
  try {
    const queryString = `SELECT * FROM ${table} WHERE id ='${id}'`;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
 }
module.exports = {
  getAll,
  findOne
};
const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");

async function getAll (req, res) {
  try {
    const queryString = `SELECT * FROM barangay`;
    const queryData = await db.executeQuery(queryString);
  //  console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}


async function findOne(req, res) {
  const pId = req.params.pId;
  try {
    const queryString = `SELECT * FROM barangay WHERE id ='${pId}'`;
    const queryData = await db.executeQuery(queryString);
  //  console.log(queryData);
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
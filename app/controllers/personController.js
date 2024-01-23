const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");

async function getAllPerson (req, res) {
  try {
    const queryString = `SELECT * FROM person`;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}


async function findPerson(req, res) {
  const pId = req.params.pId;
  try {
    const queryString = `SELECT * FROM person WHERE id ='${pId}'`;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
 }
module.exports = {
    getAllPerson,
    findPerson
};
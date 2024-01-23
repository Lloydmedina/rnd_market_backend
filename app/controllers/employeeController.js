const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");

const table = "employee";
async function getAllEmployee (req, res) {
  try {
    const queryString = `SELECT * FROM employee`;
    const queryData = await db.executeQuery(queryString);
  //  console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}


async function findEmployee(req, res) {
  const eId = req.params.eId;
  try {
    const queryString = `SELECT * FROM employee WHERE id ='${eId}'`;
    const queryData = await db.executeQuery(queryString);
  //  console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
 }
module.exports = {
  getAllEmployee,
  findEmployee
};
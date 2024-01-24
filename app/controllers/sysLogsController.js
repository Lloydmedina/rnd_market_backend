const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");

const table = "logs";

async function getSyslogs(req, res) {
  try {
    const queryString = `  SELECT a.*, b.log_title FROM ${table} a LEFT JOIN log_type b on a.log_type = b.log_id ORDER BY a.created_at DESC`;
    const queryData = await db.executeQuery(queryString);
    //console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }

}
 
module.exports = {
  getSyslogs
};
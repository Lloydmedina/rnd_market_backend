const express = require("express");
const router = express.Router();
const db = require("../config/market_connect");
const table = 'property_tenant';
async function getAll (req, res) {
  try {
    const queryString = `
    SELECT 
  pt.*,
  u.property_name,
  u.flr_blk_id,
  u.flr_blk_name,
  u.section_name,
  u.lot_unit_no,
  u.lot_unit_name,
  u.lot_unit_area,
  u.lot_unit_rental,
  u.tenant_owner_type
FROM 
${table} pt
LEFT JOIN 
  property_lot_unit u ON pt.lot_unit_id = u.id
    `;
    const queryData = await db.executeQuery(queryString);
    //console.log(queryData);
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
   // console.log(queryData);
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
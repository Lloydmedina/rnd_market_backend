const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");

const table = "users";
async function getAllUsers(req, res) {
  try {
    const queryString = `SELECT
    u.id,
    u.fullName,
    u.username,
    u.position,
    u.active,
    u.createdAt,
    u.default_pass,
    r.name as role_name,
    o.name as office_name,
    o.short_name as office_abbv
FROM
${table} u
LEFT JOIN
    role r ON u.roleId = r.id
LEFT JOIN
    office o ON u.officeId = o.id
WHERE
    u.id NOT IN ('1', '2')
ORDER BY
    u.id `;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}
async function getAllUsersRoles(req, res) {
  try {
    const queryString = `SELECT * FROM role`;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}
async function getUsersRequest(req, res) {
  try {
    const queryString = `SELECT * FROM users_request`;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}

async function findUser(req, res) {
  const uId = req.params.uId;
  try {
    const queryString = `SELECT
    u.*,
    r.name as role_name,
    o.name as office_name,
    o.short_name as office_abbv
FROM
${table} u
LEFT JOIN
    role r ON u.roleId = r.id
LEFT JOIN
    office o ON u.officeId = o.id
WHERE
    u.id = ${uId}
ORDER BY
    u.id `;
    const queryData = await db.executeQuery(queryString);
    console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
 }
module.exports = {
  findUser,
  getAllUsers,
  getAllUsersRoles,
  getUsersRequest
};
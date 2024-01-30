const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");
const changePassword_ = require("../models/changepass")
const User = db.user;
const table = "users";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userAccess_ = require("../models/userAccess");


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
   // console.log(queryData);
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
//console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}
async function getUsersRequest(req, res) {
  try {
    const queryString = `
    SELECT 
  req.*, 
  u.fullName,
  u.username,
  u.position,
  r.name AS role_name, 
  o.name AS office_name
FROM 
  users_request req
LEFT JOIN 
  role r ON req.roleId = r.id
LEFT JOIN 
  users u ON req.user_id = u.id
	LEFT JOIN 
  office o ON u.officeId = o.id
ORDER BY req.created_at DESC  
  ;

    `;
    const queryData = await db.executeQuery(queryString);
//console.log(queryData);
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
//console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}
async function getSyslogs(req, res) {
  try {
    const queryString = `
    SELECT a.*, b.log_title FROM logs a LEFT JOIN log_type b on a.log_type = b.log_id ORDER BY a.created_at DESC
    `;
    const queryData = await db.executeQuery(queryString);
//console.log(queryData);
    res.send(queryData);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing residents" });
  }
}
async function changePassword(req, res) { 
  const reqJson = db.filterReqJson(req.body, changePassword_);
  const userId = reqJson.id;
  const newPassword = reqJson.password;
  try {

    const query = `SELECT id FROM ${table} WHERE id = ${userId}`;
    const user_ = await db.executeQuery(query);
    if (!user_) {
      return res.status(404).send({ message: "User Not found." });
    } else { 

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const change_query = `
      UPDATE ${table} SET password ='${hashedNewPassword}', default_pass = 0, first_login = 0 WHERE id = ${userId}`;
      const result_ = await db.executeQuery(change_query);
      res.send(result_);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing user" });
  }
}
async function userAccessCtrl(req,res) { 
  const reqJson = db.filterReqJson(req.body, userAccess_);
  const userId = reqJson.id;
  try {
    console.log(userId)
    // const query = `SELECT * FROM ${table} WHERE id = ${userId}`;
    // const user_ = await db.executeQuery(query);
    // if (!user_) {
    //   return res.status(404).send({ message: "User Not found." });
    // } else { 
    //   res.send(user_);
    // }
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing user" });
  }
}

module.exports = {
 
  getAllUsers,
  getAllUsersRoles,
  getUsersRequest,
  getSyslogs,
  changePassword,
  userAccessCtrl,
  findUser,
};
const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");
const bcrypt = require("bcryptjs");
const UserAuthModel = require("../models/userAuth");

const table = "users";

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        //const reqJson = db.filterReqJson(req.body, UserAuthModel);

        const queryString = `SELECT * FROM users WHERE username = '${username}'`;

        const user_ = await db.executeQuery(queryString);

      if (user_.length > 0) {
        const isValid = await bcrypt.compare(password,user_[0]['password']);
            if (isValid) {
              res.status(200);
          res.send({status: "logged in", success: true});
            } else {
              res.status(400);
            res.send({status: "Password incorrect", success: false});
            }
        }else {
            res.status(400);
            res.send({status: "User not found", success: false});
        }

        // res.send(queryData);
        
    } catch (error) {
        console.error(error);
        res.status(500);
        res.send({status: "authentication error"});
    }
}

module.exports = {
    login
}
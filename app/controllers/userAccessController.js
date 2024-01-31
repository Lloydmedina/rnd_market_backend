const express = require("express");
const router = express.Router();
const db = require("../config/db_connect");
const User = db.user;
const table = "users";
const userAccess_ = require("../models/userAccess");

async function userAccessCtrl(req,res) { 
  const id = req.params.id;
  try {
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;
    const user_ = await db.executeQuery(query);
    if (!user_) {
      return res.status(404).send({ message: "User Not found." });
    } else { 
        //GET ACCESS ITEMS
        const menu_query = `
        SELECT 
        st.*,
        am.label,
        am.office_id,
        JSON_ARRAYAGG(JSON_OBJECT('label', ai.label,'icon', ai.icon, 'routerLink',ai.routerLink )) as items
        FROM access_setup st 
        INNER JOIN access_menu am ON am.id = st.menu_id
        INNER JOIN access_items ai ON ai.menu_id = am.id
        WHERE st.role_id = ${user_[0].roleId}
        AND am.office_id = "asdfsarw525"
        GROUP BY st.menu_id
        `;
      const menu_ = await db.executeQuery(menu_query);
      res.send(menu_);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Server error: Error grabbing user" });
  }
}

module.exports = {
 
  userAccessCtrl,

};
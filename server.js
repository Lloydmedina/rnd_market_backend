const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models");
const Role = db.role;
const app = express();
const users = require('./app/routes/user');
const employee = require('./app/routes/employee');
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "api-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);
// users route
app.use("/api/users", users);
//employee route
app.use("/api/employee", employee);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RND API." });
});
//auth route
require('./app/routes/auth.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

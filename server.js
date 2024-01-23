const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models");
const Role = db.role;
const app = express();
const users = require('./app/routes/user');
const employee = require('./app/routes/employee');
const person = require('./app/routes/person');
const office = require('./app/routes/office');

const market_property_type = require('./app/routes/market_property_type');
const market_property_tenant_occupant = require('./app/routes/market_property_tenant_occupant');
const market_property_status = require('./app/routes/market_property_status');
const market_property_setup = require('./app/routes/market_property_setup');
const market_property_section = require('./app/routes/market_property_section');
const market_property_tenant = require('./app/routes/market_property_tenant');
const market_property_lot_unit = require('./app/routes/market_property_lot_unit');
const market_property_floor_block = require('./app/routes/market_property_floor_block');
const market_payment_schedule = require('./app/routes/market_payment_schedule');
const market_payment_addons = require('./app/routes/market_payment_addons');
const market_inspect_logs = require('./app/routes/market_inspect_logs');
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
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RND API." });
});
// users route
app.use("/api/users", users);

//employee route
app.use("/api/employee", employee);

//person routee
app.use("/api/person", person);

//office route
app.use("/api/office", office);

//market routes
app.use("/api/market_property_type", market_property_type);
app.use("/api/market_property_tenant", market_property_tenant);
app.use("/api/market_property_tenant_occupant", market_property_tenant_occupant);
app.use("/api/market_property_status", market_property_status);
app.use("/api/market_property_setup", market_property_setup);
app.use("/api/market_property_section", market_property_section);
// app.use("/api/market_property_lot_unit", market_property_lot_unit);
// app.use("/api/market_property_floor_block", market_property_floor_block.js);
// app.use("/api/market_payment_schedule", market_payment_schedule);
// app.use("/api/market_payment_addons", market_payment_addons);
// app.use("/api/market_inspect_logs", market_inspect_logs);

//auth route
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

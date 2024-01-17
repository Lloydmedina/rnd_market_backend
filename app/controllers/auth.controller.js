const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
    
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      const passwordIsValid = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
        
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      
      }
      console.log(user)
      const token = jwt.sign({ id: user.id },
            config.secret,
            {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
            });
 
      req.session.token = token;
      //http return on success
      return res.status(200).send({
        id: user.id,
        username: user.username,
        password: user.password,
        token: token,
        roleid: user.roleId,
        fullname : user.fullName
      });
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
  }
  
  };
  
  exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
};
exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hash(req.body.password, 4),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
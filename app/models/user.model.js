module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("general_db.user", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    }
    );
  
    return User;
  };
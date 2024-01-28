module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "general_db",
    MARKET_DB: 'market_db',
    HR_DB : 'hr_db',
    PORT: "3306",
    AUTHDB : 'user',
    dialect: "mysql",
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
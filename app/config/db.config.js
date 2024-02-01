module.exports = {
    // HOST: "143.198.218.188",
    // USER: "root",
    // PASSWORD: "L3tM3!n@123654",
    // DB: "general_db",
    // MARKET_DB: 'market_db',
    // HR_DB : 'hr_db',
    // PORT: "3309",
    // AUTHDB : 'user',
    // dialect: "mysql",
   
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
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
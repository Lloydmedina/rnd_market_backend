const mysql = require("mysql2/promise")
const db = require("./db.config");

const dbPool = mysql.createPool({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.HR_DB,
    port: db.PORT,
    connectionLimit: 500,
})


async function executeQuery(query, values = []) {
    let connection;
    try {
        connection = await dbPool.getConnection()
        const [rows] = await connection.execute(query, values)
        connection.release()
        return rows
    }
    catch (err) {
        console.error(err)
        if(connection) {
            connection.release()
        }
    }
}

function filterReqJson(reqJson, allowedKeys) {
    return Object.fromEntries(
      Object.entries(reqJson).filter(([key]) => allowedKeys.includes(key))
    );
  }

//INSERT
function buildQueryString(reqJson,table,method) {
    const queryFields = Object.keys(reqJson);
    const queryValues = Object.values(reqJson).map(value => `'${value}'`);
    console.log(queryFields);
    let queryString = "";

    switch (method) {
        case "POST":
            queryString = `INSERT INTO ${table} (${queryFields}) VALUES (${queryValues})`;
            break;
        
        case "GET":
            
            break;

        case "PUT":
            
            break;
        
        case "DELETE":
            
            break;

        default:
            break;
    }
  
    return { queryString, queryValues };
  }

module.exports = {
    executeQuery,
    filterReqJson,
    buildQueryString
}
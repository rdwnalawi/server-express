const mysql = require('mysql2/promise');
const connectionPool = mysql.createPool({
    uri: process.env.DB_URI || `mysql://root:Mralawi_22@localhost:3306/msib_revou`
});

module.exports = { connectionPool };
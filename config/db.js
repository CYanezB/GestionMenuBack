const mysql = require('mysql2');


// TODO: Recuperar datos del fichero de entorno

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Barcelona98',
    port: 3306,
    database: 'gestionmenuback_sql'
});

global.db = pool.promise();
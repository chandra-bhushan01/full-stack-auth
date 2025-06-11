var mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    } else {
        console.log('Connected to database');
    }
});

module.exports = {db};


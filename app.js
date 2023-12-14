var express = require('express');
let mysql = require('mysql');
require('dotenv').config();
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/name', function (req, res) {
    res.send('My name is marko');
  });

app.get('/api/settings', function(req,res) {
    res.send(process.env.MYSQL_HOST + ' ' + process.env.MYSQL_PORT + ' ' +
    process.env.MYSQL_ROOT_PASSWORD + ' ' + process.env.MYSQL_DATABASE);
})

app.get('/api/testdata', function(req,res) {
    console.log(req.headers);
    let connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        insecureAuth: true, 
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.stack);
            return;
        }

        console.log('Connected to MySQL as id', connection.threadId);

        // Perform a SELECT statement
        const sql = 'SELECT * FROM Persons'; // Replace 'your_table_name' with your actual table name

        connection.query(sql, (queryErr, results) => {
            if (queryErr) {
                console.error('Error executing SELECT query:', queryErr);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Process the SELECT results
            console.log('SELECT results:', results);
            
            // Close the connection when done
            connection.end((endErr) => {
                if (endErr) {
                    console.error('Error closing MySQL connection:', endErr.stack);
                } else {
                    console.log('MySQL connection closed.');
                }
            });

            res.json(results); // Send the SELECT results as JSON response
        });
    });
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
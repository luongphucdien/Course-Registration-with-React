const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3305,
    user: 'root',
    password: 'lab4',
    database: 'lab7'
});
connection.connect((error) => {
    (error) ? console.log(error) : console.log("Success!");
});


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());

function isEmptyObject(obj) {
    return !Object.keys(obj).length > 0;
}

app.get('/', (req,res) => res.send("Hello World"));

app.get('/api/test', (req, res) => {
    res.json({ message: 'I am a message from Server!'});
});

app.get('/api/courses', (req, res) => {
    var query = "select * from course";
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json({courses: results});
    });
});

app.post('/api/student', (req, res) => {
    const id = req.body.id;
    console.log(id);
    var query = "select * from student where StudentID = '" + id + "'";
    connection.query(query, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.json({student: results});
    });
});

app.post('/api/validate', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    if (username === password) {
        var query = "select StudentID from student where StudentID = '" + username + "'";
        connection.query(query, (error, results) => {
            if (error) throw error;
            if (isEmptyObject(results) === false) {
                console.log("Success!");
                let token = btoa(username+password);
                return res.send({token: token, user: username});
            }
            return console.log("Error");
        });
    }
});

app.listen(3001, () => console.log("App listening on port 3001"));
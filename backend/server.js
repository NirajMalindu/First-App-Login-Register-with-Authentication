const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",      
    password: "",     
    database: "signup" 
});


// Connect to the database
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");
});


// Signup route
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password]; 

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Error inserting user" });
        }
        return res.status(201).json(data);
    });
});



// Login route
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.status(500).json("Error");

        if (data.length > 0) {
        
            if (req.body.password === data[0].password) {
                return res.json("Success");
            } else {
                return res.json("Fail");
            }
        } else {
            return res.json("Fail");
        }
    });
});


// Start server on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

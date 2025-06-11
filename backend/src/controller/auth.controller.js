const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { db } = require('../config/dbconfig');

exports.getAllUsers = (req, res) => {
    const querystr = "SELECT * FROM users";
    db.query(querystr, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.status(200).json(results);
    });
}


exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields: Full Name, Email, and Password." });
    }

    try {

        const generatedsalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, generatedsalt);

        const querystr = "INSERT INTO users (full_name , email, password) VALUES (?,?,?);"
        db.query(querystr, [fullName, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(400).json({ Message: err.sqlMessage })
            }
            else {
                res.status(200).json({ message: "Registration Successfull" })
            }
        })
    } catch {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Server error during password hashing or registration." });
    }
}




exports.userLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password are required"
        });
    }

    try {



        const getUserByEmail = (email) => {
            return new Promise((resolve, reject) => {
                const queryStr = "SELECT * FROM users";
                db.query(queryStr, [], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        };

        const userdetails = await getUserByEmail(email);


        if (!userdetails.length) {
            return res.status(404).json({ message: "User doesn't exist. Please register" });
        }

        const user = userdetails[0];

        const isMatched = await bcrypt.compare(password, user.password); // Compare hashed password

        if (!isMatched) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const payload = {
            user: {
                name: user.full_name,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });



        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


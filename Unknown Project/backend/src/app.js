import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userModel from './userModel.js';
import bodyparser from 'body-parser';
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt';
import sendMail from './middlewares/sendMail.js';
const saltRounds = 10;

// app config
const app = express();
const PORT = process.env.PORT || 3030;
const api_v = '/api/v1'
// middlewares
app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))

// DB config
const connection_url = `mongodb+srv://${process.env.DB_USERNAME_KEY}@cluster0.pc92d.mongodb.net/appdb?retryWrites=true&w=majority`;
mongoose.connect(connection_url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("db connected")
    } else {
        console.log(err.message)
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) res.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next();
    })
};


sendMail().then(result => console.log("Email Send :", result)).catch(err => console.log(err.message))


app.get('/email', (req, res) => {

})

app.route(`${api_v}/register`)
    .get()
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        if (email && password && name) {
            userModel.findOne({ email: email }, (err, user) => {
                if (!user && !err) {
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        if (err) {
                            res.json({ success: false, error: err.message })
                        } else {
                            const newUser = { ...req.body, password: hash };
                            userModel.create(newUser, (error, data) => {
                                if (!error) {
                                    const accessToken = jwt.sign(data.toJSON(), process.env.JWT_SECRET);
                                    res.json({ success: true, token: accessToken })
                                } else {
                                    res.json({ success: false, error: error.message })
                                }
                            })
                        }
                    });
                } else {
                    res.json({ success: false, error: "Email already Exists" })
                }
            })
        } else {
            res.json({ success: false, error: "Field Values Missing" })
        }

    })

app.route(`${api_v}/signin`)
    .get()
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            userModel.findOne({ email: email }, (error, data) => {
                if (!error) {
                    if (data) {
                        bcrypt.compare(password, data.password, function (err, result) {
                            if (err) {
                                res.json({ success: false, error: err.message })
                            }
                            if (result) {
                                const accessToken = jwt.sign(data.toJSON(), process.env.JWT_SECRET);
                                res.json({ success: true, token: accessToken })
                            } else {
                                res.json({ success: false, error: "Incorrect password" });
                            }

                        });
                    } else {
                        res.json({ success: false, error: "no User found" })
                    }
                }
                else {
                    res.json({ success: false, error: "Field Values Missing" })
                }
            })
        } else {
            res.json({ success: false, error: "Field Values Missing" })
        }

    })


// api route
app.route(`${api_v}/users`)
    .get(authenticateToken, (req, res) => {
        userModel.find((error, data) => {
            if (error)
                res.status(500).send(error)
            else
                res.status(200).send(data)
        })
    })

    .post((req, res) => {
        var myobj = { name: req.body.name, email: req.body.email };
        userModel.create(myobj, (error, data) => {
            if (error)
                res.status(500).send(error)
            else
                res.status(200).send(data)
        });
    })

    .delete(authenticateToken, (req, res) => {
        userModel.deleteMany((error, data) => {
            if (error)
                res.status(500).send(error)
            else
                res.status(200).send(data)
        });
    })

app.route(api_v, '/users/:userId')
    .get((req, res) => {
        const userId = req.params.userId;
        const query = { _id: userId }
        const myquery = JSON.stringify(query)
        userModel.findById(userId, (error, data) => {
            if (error)
                res.status(500).send(error)
            else
                if (data) {
                    res.status(200).send(data)
                }
                else {
                    res.status(404).json({ error: 'User not found' })
                }
        });
    })

    .put((req, res) => {
        const userId = req.params.userId;
        userModel.updateOne({ '_id': userId }, { name: req.body.name, email: req.body.email }, { overwrite: true }, (error, data) => {
            if (error)
                res.status(500).send(error.message)
            else
                if (data) {
                    res.status(200).send(data)
                }
                else {
                    res.status(404).json({ error: 'User not found' })
                }
        });
    })

    .delete((req, res) => {
        const userId = req.params.userId
        userModel.deleteOne({ '_id': userId }, (error, data) => {
            if (error)
                res.status(500).send(error.message)
            else
                if (data.n) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(404).json({ error: 'User not found' })
                }
        });
    })


    .patch((req, res) => {
        const userId = req.params.userId;
        userModel.updateOne({ '_id': userId }, { $set: req.body }, (error, data) => {
            if (error)
                res.status(500).send(error.message)
            else
                if (data.n) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(404).json({ error: 'User not found' })
                }
        });
    })

app.route('/')
    .get((req, res) => {
        res.send("Server is running")
    })




app.listen(PORT, () => console.log('server is up!'))
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

// Import Router files
const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter');
const classRouter = require('../client/clientRouter');
const instructorRouter = require('../instructor/instructorRouter');
const authenticate = require('../auth/authenticate');

// Api

const server = express();

const sessionConfig = {
    name: 'auth',
    secret: 'authenticateUser',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore(
        {
            knex: require('../database/db-config.js'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 1000 * 60 * 60
        }
    )
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

// Router endpoints
server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/instructor', instructorRouter);
server.use('/api/classes', classRouter)
//Testing


server.use('/', (req, res) => {
    res.send(`
    <h2>API is working</h2>
    `);
});

server.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = server;
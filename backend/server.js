// const express = require('express');
// require('dotenv').config();

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.routes.js' // with import we will have to use .js also
import connectToMongoDB from './database/db.js';


const app = express();

app.use(express.json()) // to parse the incoming request with JSON payloads (from req.body)

// Routes - middleware
app.use('/api/auth', authRoutes)

// app.get('/', (req, res) => {
//     res.send('Hello world!')
// })

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    connectToMongoDB()
    console.log(`App is listening on port ${port}`);
});
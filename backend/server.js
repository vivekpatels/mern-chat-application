// const express = require('express');
// require('dotenv').config();

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path';

import authRoutes from './routes/auth.routes.js' // with import we will have to use .js also
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'


import connectToMongoDB from './database/db.js';
import { app,server } from './socket/socket.js'

const __dirname = path.resolve();

dotenv.config()

app.use(express.json()) // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());


// Routes - middleware
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

// app.get('/', (req, res) => {
//     res.send('Hello world!')
// })

const port = process.env.PORT || 5000;

server.listen(5000, () => {
    connectToMongoDB()
    console.log(`App is listening on port ${port}`);
});
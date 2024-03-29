// const express = require('express');
// require('dotenv').config();

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!')
})


const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`App is listening on port ${port}`);
});
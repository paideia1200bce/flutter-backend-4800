//const express = require('express')
import express from 'express';

const app = express()

//simple api route definition
app.get('/', (req, res) => {
  console.log("hello from express");
  res.status(200); //responding with 200 OK
  res.json({message: "hello"});
})

//exporting the express server to be consumed by index.js
//module.exports = app
export default app
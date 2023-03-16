//const express = require('express')
import router from './router';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUserPersonalInfo, createNewUserSurvey, signin } from './handlers/user';

const app = express()


//cors middlware used to change configs on a server
app.use(cors())

//global declaration: every request that reaches the API goes through morgan first, to be logged
app.use(morgan('dev'))

//configuring the app to accept json input from the client
app.use(express.json())

//allows query string as user input in the api call. ex: google.com?a=1,thing=otherthing
app.use(express.urlencoded({extender: true}))//helps turn the req params into objs

//example custom middleware
// app.use((req, res, next) => {
//   req.testpayload = 'test'
//   next()
// })



//simple api route handler 
app.get('/', (req, res) => {
  console.log("hello from express");
  res.status(200); //responding with 200 OK
  res.json({message: "hello"});
})

//using the routes defined in routers.ts
//implementing the protect middleware to check for unauthorized (no JWT) access
app.use('/api', protect, router)

//create new user route
app.post('/signup', createNewUserPersonalInfo)

app.post('/signup/survey', createNewUserSurvey)

//app.post('/signup', )

//sign in route
app.post('/signin', signin)

//creating error handler
app.use((err, req, res, next) => {
  if(err.type === 'auth'){
    res.status(401).json({message: 'unauthorized'})
  }
  else if(err.type === 'input'){
    res.status(400).json({message: 'invalid input'})
  }
  else{
    res.status(500).json({message: 'we\'\ll be back'})
  }
})

//exporting the express server to be consumed by index.js
export default app
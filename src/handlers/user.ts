/*
  user handler file
*/
import { nextTick } from "process";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";


// export const createNewUser = async (req, res, next) => {
//   try{
//     const user = await prisma.user.create({
//       //expecting the following json data from the client request
//       data: {
//         username: req.body.username,
//         password: await hashPassword(req.body.password),

//       }
//     })

//     const token = createJWT(user)
//     res.json({ token: token })
//   }catch(e){
//     e.type = 'input'
//     next(e)

//   }
// }

//receives request from the frontend via the res obj
export const createNewUserPersonalInfo = async (req, res, next) => {
  try{
    const user = await prisma.user.create({
      //expecting the following json data from the client request
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        civil_status: req.body.civil_status,
        gender: req.body.gender,
        phone_no: req.body.phone_no,
        residence: req.body.residence,
      }
    })

    const token = createJWT(user)
    res.json({ token: token })
  }catch(e){
    e.type = 'input'
    next(e)

  }
}

export const createNewUserSurvey = async (req, res, next) => {
  // try{
  //   const user = await prisma.survey.create({
  //     //expecting the following json data from the client request
  //     data: {
  //       username: req.body.username,
  //       password: await hashPassword(req.body.password),

  //     }
  //   })

  //   const token = createJWT(user)
  //   res.json({ token: token })
  // }catch(e){
  //   e.type = 'input'
  //   next(e)

  // }
}

//handler function which communicates with db to find username stored in db and 
//match it with the one provided by the user in http req
//also compares the plain text password with its hashed version in the db
export const signin = async (req, res) => {
  //returns the user obj with the related info from db
  const user = await prisma.user.findUnique({
    where:{
      username: req.body.username
    }
  })
  
  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid){
    res.status(401)
    res.json({message: 'unauthorized'})
    return

  }
}
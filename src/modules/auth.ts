import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//function to compare the plain text password submitted by user
//with the hashed version of the password in the database
export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
  const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET)
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer){
    res.status(401)
    res.json({message: 'not authorized'})
    return
  }

  const [, token] = bearer.split(' ')
  if(!token){
    res.status(401)
    res.json({message: 'not authorized'})
    return
  }

  try {
    //console.log("request user", req)
    const payload = jwt.verify(token, process.env.JWT_SECRET) 
    req.user = payload //here is where the user payload is assigned to the request
    console.log("request user", req)
    next()
  } catch (e){
    console.error(e)
    res.status(401)
    res.json({message: 'not valid token'})
    return

  }
}
import { validationResult } from "express-validator";

//this middleware function automatically infers the req, res, and next parameters if added
//in the position of the middleware in the route definition 
export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    res.status(400)
    res.json({ errors: errors.array()});
    }
  else{
    next()
  }
  }

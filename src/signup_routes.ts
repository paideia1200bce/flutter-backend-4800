// import {Router} from 'express';
// import { body } from 'express-validator';
// import { handleInputErrors } from './modules/middleware';
// import { oneOf } from 'express-validator';
// import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
// import { createUpdate, deleteUpdate, getUpdates, oneUpdate, updateUpdate } from './handlers/update';

// const registration = Router()

// /*
// Product routes
// */
// router.get('/product', getProducts)
// router.get('/product/:id', getOneProduct)
// //adding middleware to check for request contents
// //2 middleware components being used: body() to check for req contents and validationResult(), which validates the
// //response from body()
// router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
// router.post('/product', body('name').isString(), handleInputErrors, createProduct)
// router.delete('/product/:id', deleteProduct)

// /*
// Updates routes
// */
// router.get('/update', getUpdates)
// router.get('/update/:id', oneUpdate)
// router.put('/update/:id', 
//   body('title').optional(), 
//   body('body').optional(), 
//   body('status').isIn(['IN_PROGRESS', 'SHIPPED','DEPRECATED']).optional(), 
//   body('version').optional(),
//  updateUpdate)
// //version and status not being checked for in req as a default value is assigned
// router.post('/update', body('title').exists().isString(), 
// body('body').exists().isString(), 
// body('productId').exists().isString(),
// createUpdate)
// router.delete('/update/:id', deleteUpdate)

// router.get('/updatepoint', () => {})
// router.get('/updatepoint/:id', () => {})
// router.put('/updatepoint/:id', 
//   body('name').optional().isString(), 
//   body('description').optional().isString(), 
//   () => {})
// router.post('/updatepoint', 
//   body('name').optional().isString(), 
//   body('description').optional().isString(), 
//   body('updateId').exists().isString(),
//   () => {})
// router.delete('/updatepoint/:id', () => {})

// router.use((err, req, res, next) => {
//   console.log(err)
//   res.json({message: 'in router handler'})
// })

// export default registration;


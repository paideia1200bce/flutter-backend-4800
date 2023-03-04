import prisma from "../db";

export const oneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.json({data: update})
}

export const getUpdates = async (req, res) => {
  console.log("getupdates incoming request", req)
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })
  //typically want to avoid storing things in cache/memory and instead design the db schema
  //to handle the following request
  /*The callback function takes two parameters: the accumulator (allUpdates) and the current value (product) being processed. 
  The callback function returns a new array that concatenates the current product's updates array onto the existing 
  allUpdates array using the spread operator ([...allUpdates, ...product.updates]).
  */
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  res.json({data: updates})
}

export const createUpdate = async (req, res) => {
  //const {productId, ...rest} = req.body
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId
    }
  })

  if (!product){
    //does not belong to the user
    return res.json({message: 'denied!'})
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title, 
      body: req.body.body,
      product: {connect: {id: product.id}}
    }
  
  })

  res.json({data: update})
}

export const updateUpdate = async (req, res) => {
  //first find the products that belong to the user
  const products = await prisma.product.findMany({
    where: {
        belongsToId: req.user.id,
    },
    include: {
      updates: true
    }

  })

  //compile a list of updates for that specific product/products
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, []) 

  //find the specific update (from the list of user-specific product updates) by matching the req id 
  //and retrieved ids of the updates from the db
  const match = updates.find(update => update.id === req.params.id)

  if(!match) {
    return res.json({message: "denied"})
  }

  //update the data in the database using the data passed via http request
  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body 
  })

  res.json({data: updatedUpdate})

}

export const deleteUpdate = async (req, res) => {

  //first find the products that belong to the user
  const products = await prisma.product.findMany({
    where: {
        belongsToId: req.user.id,
    },
    include: {
      updates: true
    }

  })

  //compile a list of updates for that specific product/products
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, []) 

  //find the specific update (from the list of user-specific product updates) by matching the req id 
  //and retrieved ids of the updates from the db
  const match = updates.find(update => update.id === req.params.id)

  if(!match) {
    return res.json({message: "denied"})
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({data: deleted})
}

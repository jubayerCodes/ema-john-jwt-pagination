const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opkciwj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyJWT = (req, res, next) =>{
  const authorization = req.headers.authorization

  if(!authorization){
    console.log('authorization', authorization);
    return res.status(401).send({error: true, message: 'unauthorized access'})
  }

  const token = authorization.split(' ')[1]

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (error, decoded)=>{
    if(error){
      console.log('token', token);
      return res.status(401).send({error: true, message: 'unauthorized access'})
    }

    req.decoded = decoded

    next()
  })
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const productsCollection = client.db('ema-john').collection('products')
    const cartCollection = client.db('ema-john').collection('cart')

    app.get('/products', async(req, res)=>{
        const cursor = productsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/cart',verifyJWT, async(req, res)=>{
        const email = req?.query?.email

        // console.log();

        if(email !== req?.decoded?.email){

          // console.log(email, req?.decoded?.email);

          return res.status(403).send({error: true, message: 'forbidden'})
        }

        // console.log(email, req?.decoded?.email);

        const query = email ? {email: email} : {}

        const cursor = cartCollection.find(query)
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post('/cart', async(req, res)=>{
        const product = req.body


        const query = {productId: product.productId}
        const options = {upsert: true}

        const singleProduct = await cartCollection.findOne(query)

        if(singleProduct){
            const quantity = singleProduct.quantity

            const updatedProduct = {
                $set: {
                    quantity: quantity + 1
                }
            }

            const result = await cartCollection.updateOne(query, updatedProduct)
            res.send(result)
        } else{
            const result = await cartCollection.insertOne(product)
            res.send(result)
        }
    })

    app.delete('/cart', async(req, res)=>{
        const email = req?.query?.email

        const query = email ? {email: email} : {}
        const result = await cartCollection.deleteMany(query)
        res.send(result)
    })

    app.delete('/cart/:id', async(req, res)=>{
        const id = req.params.id
        const query = {_id: new ObjectId(id)}

        const result = await cartCollection.deleteOne(query)
        res.send(result)
    })

    // JWT

    app.post('/jwt', (req, res)=>{
      const user = req.body

      const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {expiresIn: 10})

      // console.log(token);

      res.send({token})
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Ema john is running')
})

app.listen(port)
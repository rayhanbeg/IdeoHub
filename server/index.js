
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
const app = express()
const corsOption = {
        origin: ['http://localhost:5173','https://ideohub-i9098.web.app'],
        credentials: true,
        optionsSuccessStatus: 200
}
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())


// verify jwt middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token
    if (!token) return res.status(401).send({ message: 'unauthorized access' })
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log(err)
          return res.status(401).send({ message: 'unauthorized access' })
        }
        console.log(decoded)
  
        req.user = decoded
        next()
      })
    }
  }

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bahxz3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
        const jobCollection = client.db('IdeoHub').collection('Jobs')
        const bidCollection = client.db('IdeoHub').collection('bids')
        // get all data
        app.get('/jobs', async (req, res) => {
            const result = await jobCollection.find().toArray()
            res.send(result)
        })


            // jwt generate
    app.post('/jwt', async (req, res) => {
        const email = req.body
        const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '365d',
        })
        res
          .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
      })




          // Clear token on logout
    app.get('/logout', (req, res) => {
        res
          .clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 0,
          })
          .send({ success: true })
      })



        // single get data
        app.get('/job/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await jobCollection.findOne(query)
            res.send(result)
        })
        // get all data by a user
        app.get('/jobs/:email', verifyToken, async (req, res) => {
          const tokenEmail = req.user.email
            const email = req.params.email
             
          if(tokenEmail !== email) {
            return res.status(403).send({message: 'Access forbidden'})
          }
            const query = {'buyer.email': email}
            const result = await jobCollection.find(query).toArray()
            res.send(result)
        })

        // save bid data in db
        app.post('/bid', async (req, res) => {
            const bidData = req.body

             // check for duplicate request
             const query = {
              email: bidData.email,
              jobId: bidData.jobId
            }
            const alreadyApplied = await bidCollection.findOne(query)
            console.log(alreadyApplied);
            if(alreadyApplied) {
              return res.status(400).send('You have already placed a bit on this job')
            }
            console.log(bidData)
            const result = await bidCollection.insertOne(bidData)
            res.send(result)
        })
        app.post('/job', async (req, res) => {
            const jobData = req.body
            console.log(jobData)
            const result = await jobCollection.insertOne(jobData)
            res.send(result)
        })

        // get all bids for a user form email from db 
        app.get('/myBids/:email', verifyToken, async (req, res) => {
            const email = req.params.email
            const query = { email }
            const result = await bidCollection.find(query).toArray()
            res.send(result)
        })


        // get requested bids data 
        app.get('/bidRequested/:email', verifyToken, async (req, res) => {
            const email = req.params.email
            const query = {'buyer.email': email}
            const result = await bidCollection.find(query).toArray()
            res.send(result)
        })

         // get all data for pagination
         app.get('/allJobs', async (req, res) => {
          const size = parseInt(req.query.size)
      const page = parseInt(req.query.page) - 1
      const filter = req.query.filter
      const sort = req.query.sort
      const search = req.query.search
      console.log(size, page)

      let query = {
        job_title: { $regex: search, $options: 'i' },
      }
      if (filter) query.category = filter // {...query, category: filter}
      let options = {}
      if (sort) options = { sort: { deadline: sort === 'asc' ? 1 : -1 } }
      const result = await jobCollection
        .find(query, options)
        .skip(page * size)
        .limit(size)
        .toArray()

      res.send(result)
      })
         // get all data for count
         app.get('/jobsCount', async (req, res) => {
          const filter = req.query.filter
      const search = req.query.search
      let query = {
        job_title: { $regex: search, $options: 'i' },
      }
      if (filter) query.category = filter
      const count = await jobCollection.countDocuments(query)

      res.send({ count })
      })

        // Update bid status
        app.patch('/bid/:id', async (req,res) => {
            const id = req.params.id
            const status = req.body
            const query = {_id: new ObjectId(id)}
            const updateDoc = {
                $set: status,
            }
            const result = await bidCollection.updateOne(query,updateDoc)
            res.send(result)
        })

        // delete
        app.delete('/job/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = {_id: new ObjectId(id)}
            const result = await jobCollection.deleteOne(query)
            res.send(result)
        })


        // update 
        app.put('/job/:id',verifyToken, async (req,res) => {
            const id = req.params.id
            const jobData = req.body
            const query = {_id: new Object(id)}
            const option = {upsert: true}
            const updateDoc = {
                $set: {
                    ...jobData
                }
            }
            const result = await jobCollection.updateOne(query,updateDoc,option)
            res.send(result)
        })

    //   await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req,res) => {
    res.send('Hello From IdeoHub server')
})


app.use(express.json())
app.listen(port, ()=> console.log(`Server running on port ${port}`))
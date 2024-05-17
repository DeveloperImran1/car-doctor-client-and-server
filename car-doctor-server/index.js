const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        // 'https://car-doctor-8860b.web.app',
        // 'https://car-doctor-8860b.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())


// amader create kora middleware
const logger = async (req, res, next) => {
    console.log("called: ", req.host, req.originalUrl)
    next();
}

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log("Value of token in middleware", token)

    // token na thakle
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' })
    }
    // token thakle er moddhe asbe and ai token a kono vull thakele err hobe. sei err k akta message dia return kore diasi. 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // error
        if (err) {
            console.log(err);
            return res.status(401).send({ message: 'unauthorized' })
        }

        // if token is valid then it would be decoded
        console.log("Value in the token: ", decoded)
        req.user = decoded;
        next()
    })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0aipf7j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const serviceCollection = client.db("carDoctor").collection('servicess');
        const bookingCollection = client.db("carDoctor").collection("booking");


        // // auth related api
        // app.post('/jwt', logger, async (req, res) => {
        //     const user = req.body;
        //     console.log(user);
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        //     res
        //         .cookie('token', token, {
        // httpOnly: true,
        // secure: false,   
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        //         })
        //         .send({ success: true })
        // })


        // Recap auth related api 
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            console.log("User for token ", user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
            })
                .send({ success: true })
        })

        // cookie remove korbo, jokhon /logout path a jabe.
        app.post('/logout', async (req, res) => {
            const user = req.body;
            console.log("logged out user ", user)
            res.clearCookie('token', {
                maxAge: 0,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
            }).send({ success: true })
        })

        // get all data in servicess collection with ascending or descending order
        app.get("/servicess", logger, async (req, res) => {
            const filter = req.query;
            console.log(filter)   // { sort: 'asc', minimum: '40', maximum: '70' }
            const minimum = parseInt(filter.minimum);
            const maximum = parseInt(filter.maximum);
            const query = {
                // price: { $lt: 150}   // lt- less than 150
                // price: { $lte: 150}   // lte- less than or equal 150
                // price: { $gt: 150}   // gt- getther than 150
                // price: { $gte: 150}   // gte- getter than or equal 150
                // price: {$ne: 100}     // ne - not equal of 100
                // price: {$in: [10, 20, 30]}     // in - in: aikhane akta array dita hoi,, ai array er moddhe jei jei element db er price property er value er sathe match korbe sudho tader k daw.
                // price: {$nin: [10, 20, 30]}     // nin - ai array er value gulo bade sokol value gulor akta array return korbe.
                // price: { $gt: minimum, $lt: maximum }   // ner theke boro and 100 er theke soto.

                // aita and er condition,, sei sokol data k daw, jader job_role property er value stroke associate and emp_age property er value 20 er theke boro or equal and 30 er theke soto or equal.
                // $and: [{"job_role": "stroke Associate"}, {"emp_age":{$gte: 20, $lte: 30}}]   // ar find er moddhe query k add kore find er bracket er por .pretty() call kore dita hobe.

                // ai code dia bughai sei skol data k return koro, jader emp_age property er value 40 er besi ba soman noi. sudho tader k daw.
                // "emp_age": { $not: { $gte: 40 } }

                // $or data bujhasse job_role property er value senior cashiar or store manager hole tader object ta daw.
                // $or: [{"job_role": "Senior Cashiar"}, {"Job_role": "Store Manager"}]   // find korar por last .pretty() dita hobe.


                // Sarching er operation
                title: {$regex: filter.search, $options: 'i'}
            };
            const options = {
                sort: {
                    price: filter.sort === 'asc' ? 1 : -1
                }
            }

            const cursor = serviceCollection.find(query, options);
            const result = await cursor.toArray();
            res.send(result)
        })

        // get specific one data with few property in servicess collection
        app.get('/servicess/:id', logger, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const options = {
                // Include only the `_id, title` and `imdb` fields in the returned document
                projection: { _id: 1, title: 1, service_id: 1, price: 1, img: 1 },
            };

            const result = await serviceCollection.findOne(query, options);
            res.send(result);
        })



        // boking opreation

        // data special vabe get korbo
        app.get('/bookings', logger, verifyToken, async (req, res) => {
            console.log(req.query.email);
            console.log("token owner info: ", req.user)

            // check now user valid kina
            if (req.user.email !== req.query.email) {
                return res.send(403).send({ message: "Forbidden access" })
            }

            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }
            const result = await bookingCollection.find(query).toArray();  // 2 line er kaj 1 line a korisi.
            res.send(result)

        })

        // data post ba add korbo
        app.post("/bookings", async (req, res) => {
            const booking = req.body;
            console.log(booking)
            const result = await bookingCollection.insertOne(booking);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get("/", (req, res) => {
    res.send("Doctor is runnign")
})

app.listen(port, () => {
    console.log(`car doctor is runig ${port}`)
})




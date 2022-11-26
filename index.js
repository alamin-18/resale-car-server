const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;



//resaleproduct
//p7S9NetalykRy1zy

// middleware
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('resale car server is running');
})


const uri = "mongodb+srv://resaleproduct:p7S9NetalykRy1zy@cluster0.zokrihv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const usersCollection = client.db('resaleCar').collection('users');
        const productsCollection = client.db('resaleCar').collection('products');
        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const loginUser = await usersCollection.findOne({
                email: user.email,
            });
            if (!loginUser) {
                await usersCollection.insertOne(user);
            }
            res.status(200).send({
                msg: "Registration Successfully"
            });
        });

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

        app.post('/products', async (req, res) => {
            const products = req.body;
            // console.log(user);
            await productsCollection.insertOne(products);
            
            res.status(200).send({
                msg: "Products Added Successfully"
            });
        });

        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        });
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const quyery = { _id: ObjectId(id)};
            const product = await productsCollection.findOne(quyery)
            res.send(product)
        });
        

        // app.get('/users/:role', async (req, res) => {
        //     const role = req.params.role;
        //     const query = { role: role };
        //     const users = await usersCollection.findOne(query);
        //     res.send(users);
        // })

    }
    finally {

    }
}
run()

app.listen(port, () => {
    console.log(`resale car server running on ${port}`)
    client.connect(err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
        }

    });
})
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
        const advertiseCollection = client.db('resaleCar').collection('advertise');
        const ordersCollection = client.db('resaleCar').collection('orders');
        const catagoryCollection = client.db('resaleCar').collection('catagory');
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
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter);
            res.send(result)

        })

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
            const quyery = { _id: ObjectId(id) };
            const product = await productsCollection.findOne(quyery)
            res.send(product)
        });

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(filter);
            res.send(result)

        })

        app.post('/advertise', async (req, res) => {
            const advertise = req.body;
            // console.log(user);
            await advertiseCollection.insertOne(advertise);

            res.status(200).send({
                msg: "Products Added Successfully"
            });
        });

        app.get('/advertise', async (req, res) => {
            const query = {};
            const advertise = await advertiseCollection.find(query).toArray();
            res.send(advertise);
        });
        app.delete('/advertise/:id', async (req, res) => {

            try {
                const id = req.params.id;
                console.log(id)
                await advertiseCollection.deleteOne({
                    _id: id
                });
                res.status(200).send({ msg: "Deleted" });
            }
            catch (err) {
                console.log(err)
            }

        })

        app.post('/orders', async (req, res) => {
            const order = req.body;
            
            const result = await ordersCollection.insertOne(order);

            res.send(result);
        });
        
        

        app.post('/catagory', async (req, res) => {
            const catagory = req.body;
            const result = await catagoryCollection.insertOne(catagory);
            res.send(result);
        });

        app.get('/catagory', async (req, res) => {
            const query = {};
            const catagory = await catagoryCollection.find(query).toArray();
            res.send(catagory);
        });
        app.get("/catagory/:id", async (req, res) => {
            const id = req.params.id;
            const catagory = await catagoryCollection.findOne({
              _id: ObjectId(id)
            });
            const allProduct = await productsCollection
              .find({ catagory: catagory.catagory })
              .toArray();
            res.status(200).send({ product: allProduct });
          });

        // app.get('/products/:catagory', async (req, res) => {
        //     const catagory = req.params.catagory;
        //     // const quyery = { _id: ObjectId(id)};
        //     const catagorys = await productsCollection.toArray(catagory)
        //     res.send(catagorys)
        // });


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

/*
app.get("/api/category/:id", async (req, res) => {
  const id = req.params.id;
  //console.log(id);

  const category = await categoryCollection.findOne({
    _id: ObjectId(id),
  });
  //console.log(category.category);

  const allProduct = await productCollection
    .find({ category: category.category })
    .toArray();
  //console.log(allProduct);
  res.status(200).send({ product: allProduct });
});
*/
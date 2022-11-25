const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

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
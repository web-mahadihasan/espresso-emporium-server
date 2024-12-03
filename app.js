const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

//post man use for data base function
 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@project-0.p8l0k.mongodb.net/?retryWrites=true&w=majority&appName=Project-0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const mongoServer = async () => {
    try {
        await client.connect();
        const database = client.db("coffeesDB");
        const coffeeCollection = database.collection("coffees");

        // Get all coffee 
        app.get("/coffees", async (req, res) => {
            const cursor = coffeeCollection.find();
            const result = await cursor.toArray()
            // res.send(person)
            res.send(result)
        })
        // Get single coffee 
        app.get("/update-coffee/:id", async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await coffeeCollection.findOne(query)
            res.send(result)
        })

        // Create Coffee collection
        app.post("/coffees", async (req, res) => {
            const coffee = req.body
            const result = await coffeeCollection.insertOne(coffee);
            res.send(result)
        })
        // Remove Coffee from collection
        app.delete("/coffees/:id", async (req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id)}

            const remaining = await coffeeCollection.deleteOne(query)
            res.send(remaining)
        })

        // Updata Coffee data from collection 
        app.put("/update-coffee/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = {_id: new ObjectId(id)};
            const options = { upsert: true };
            const updateData = {
                $set: 
                    {
                        name : data.name, 
                        chef : data.chef, 
                        supplier : data.supplier, 
                        category : data.category, 
                        details : data.details,
                        price: data.price,
                        photoURL : data.photoURL
                    }
                
            };
            const result = await coffeeCollection.updateOne(filter, updateData, options);
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error)
    }
}
mongoServer()

app.get("/", (req, res) => {
    res.send("connect")
})

app.listen(port, () => {
    console.log(`This server run with ${port}`)
})
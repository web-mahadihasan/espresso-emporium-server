const { ObjectId } = require("mongodb");
const { client } = require("../config/database");

const coffeeCollection = client.db("coffeesDB").collection("coffees");

// Get all coffee
const getAllCoffees = async (req, res) => {
  const cursor = coffeeCollection.find();
  const result = await cursor.toArray();

  res.send(result);
};

// Get single coffee 
const getCoffeeById = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = {_id: new ObjectId(id)}
    const result = await coffeeCollection.findOne(query)
    res.send(result)
}

// Update coffee
const updateCoffee = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const data = req.body;
  const filter = {_id: new ObjectId(id)};
  const options = { upsert: true };
  const updateData = {
    $set: {
      name: data.name,
      chef: data.chef,
      supplier: data.supplier,
      category: data.category,
      details: data.details,
      price: data.price,
      photoURL: data.photoURL,
    },
  };
  const result = await coffeeCollection.updateOne(filter, updateData, options);
  res.send(result);
};

// Create coffee 
const createCoffee = async (req, res) => {
    const coffee = req.body
    const result = await coffeeCollection.insertOne(coffee);
    res.send(result)
}

// Remove coffee 
const removeCoffee = async (req, res) => {
    const id = req.params.id
    const query = {_id: new ObjectId(id)}

    const remaining = await coffeeCollection.deleteOne(query)
    res.send(remaining)
}

module.exports = {
  getAllCoffees,
  getCoffeeById,
  createCoffee,
  removeCoffee,
  updateCoffee,
};

const { client } = require("../config/database")

const userCollection = client.db("espresso_EmporiumUser_DB").collection("users");

//Get all users 
const getAllUser = async (req, res) => {
    const cursor = userCollection.find();
    const result = await cursor.toArray();
    res.send(result)
}

// Create new user 
const createNewUser = async (req, res) => {
    const user = req.body
    const result = await userCollection.insertOne(user)
    res.send(result)
}


module.exports = {
    getAllUser,
    createNewUser
}
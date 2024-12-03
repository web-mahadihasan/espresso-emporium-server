const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/database");
const coffeeRoutes = require("./routes/coffeeRoutes")
const usersRoutes = require("./routes/userRoutes")

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())

//Data base connection
connectToDatabase()

// Routes
app.use("/coffees", coffeeRoutes);
app.use("/update-coffee", coffeeRoutes);
app.use("/users", usersRoutes)

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Server is running")
})

// Start Server
app.listen(port, () => {
    console.log(`This server run with ${port}`)
})
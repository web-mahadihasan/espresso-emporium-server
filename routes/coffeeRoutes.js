const express = require("express");
const { getAllCoffees,  getCoffeeById, updateCoffee, createCoffee, removeCoffee } = require("../controllers/coffeeController");


const router = express.Router();

//Routes 

router.get("/", getAllCoffees);
router.get("/:id", getCoffeeById)
router.post("/", createCoffee)
router.delete("/:id", removeCoffee)
router.put("/:id", updateCoffee)


module.exports = router;
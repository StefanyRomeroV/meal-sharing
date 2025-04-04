import express from "express";  
import knex from "../database_client.js";
const mealsRouter = express.Router();

// Get all meals
const getAllMeals =async() => {
  try {
    const meals = await knex("meals").select("*").orderBy("id", "asc");
   return(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }};

// Get api/ meals
mealsRouter.get("/", async (req, res) => {
  const meals = await getAllMeals();
  res.json(meals);
});
//Post api/meals
mealsRouter.post("/", async (req, res) => {
  const { title, description, location, price, max_reservations } = req.body;
  try {
    const [newMeal] = await knex("meals").insert(
      { title, description, location, price, max_reservations },
      ["*"]
    );
    res.status(201).json(newMeal);
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(500).json({ error: "Failed to create meal" });
  }
});


mealsRouter.get("/:id", async (req, res) => {
  try {
    const meal = await knex("meals").where({ id }).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res.status(500).json({ error: "Failed to fetch meal" });
  }
});
// Put api/meals/:id
mealsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, location, price, max_reservations } = req.body;
  try {
    const [updatedMeal] = await knex("meals")
      .where({ id })
      .update(
        { title, description, location, price, max_reservations },
        ["*"]
      );
    if (!updatedMeal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(updatedMeal);
  } catch (error) {
    console.error("Error updating meal:", error);
    res.status(500).json({ error: "Failed to update meal" });
  }
});

//delete api/meals/:id


);

export default mealsRouter;







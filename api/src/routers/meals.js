import express from "express";  
const mealsRouter = express.Router();
import { getMeals, getMealById, createMeal, updateMeal, deleteMeal } from "./data/meals";


mealsRouter.get("/", async (req, res) => {
  const meals = await getMeals();
  res.json(meals);
});

//*----h3-----*//

mealsRouter.ger("/", async (req, res) => {
  const maxPrice = await getMaxPrice (req.query.maxPrice);
  res.json(maxPrice);
}
);
 mealsRouter.get("/", async (req, res) => {
  const availableReservations = await getAvailableReservations(req.query.availableReservations);
  res.json(availableReservations);
}
);
mealsRouter.get("/", async (req, res) => { 
  const title = await getTitle(req.query.title);
  res.json(title);
}
);
mealsRouter.get("/", async (req, res) => {
  const dateAfter = await getDateAfter(req.query.dateAfter);
  res.json(dateAfter);
}
);

mealsRouter.get("/", async (req, res) => {
  const dateBefore = await getDateBefore(req.query.dateBefore);
  res.json(dateBefore);
}
);

mealsRouter.get("/", async (req, res) => {
  const limit = await getLimit(req.query.limit);
  res.json(limit);
}
);
mealsRouter.get("/", async (req, res) => {
  const limit = await getLimit(req.query.limit);
  res.json(limit);
}   
);
mealsRouter.get("/", async (req, res) => {
  const sortKey = await getSortKey(req.query.sortKey);
  res.json(sortKey);
}
);
mealsRouter.get("/", async (req, res) => {
  const sortDir = await getSortDir(req.query.sortDir);
  res.json(sortDir);
}
);
//*----h3-----*//

mealsRouter.get("/:id", async (req, res) => {
  const meals = await getMealById(req.params.id);
  if (meals) {
    res.json(meals);
  } else {
    res.status(404).json({ error: "Meal not found" });
  }
});
    
mealsRouter.post("/", async (req, res) => {
    const newMeal = req.body;
    const meals = await createMeal(newMeal);
    res.json(meals);
    });

mealsRouter.put("/:id", async (req, res) => {  
    const updatedMeal = req.body;
    const meals = await updateMeal(req.params.id, updatedMeal);
    res.json(meals);
    }
);

mealsRouter.delete("/:id", async (req, res) => {
    const meals = await deleteMeal(req.params.id);
    res.json(meals);
    }
);

export default mealsRouter;






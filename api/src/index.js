import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is working" });
});
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);
apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationsRouter);
apiRouter.use("/reviews", reviewsRouter);


app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});

app.get("/my-server", (req, res) => {
  res.send("Hello World!");
}
);

apiRouter.get("/future-meals", async (req, res) => {
  try{
    const GET_FUTURE_MEALS_QUERY = "SELECT * FROM meals WHERE `when` > NOW();";
    const [futureMeals] = await knex.raw(GET_FUTURE_MEALS_QUERY);
    res.json(futureMeals);
  } catch (error) {
    console.error("Fetching Future Meals Error:", error);
    res.status(500).json({ error: "Not successful" });
  }
});


apiRouter.get("/past-meals", async (req, res) => {
  try{
    const GET_PAST_MEALS_QUERY =
     "SELECT * FROM meals WHERE meal_date < NOW() ORDER BY DESC;";
     const pastMeals = await knex.raw(GET_PAST_MEALS_QUERY);
      res.json({ pastMeals });

  }
  catch (error) {
    console.error("Error fetching past meals:", error);
    res.status(500).json({ error: "Failed to fetch past meals" });
  }
});

apiRouter.get("/all-meals", async (req, res) => {
  try {
    const GET_ALL_MEALS_QUERY =
      "SELECT * FROM meals ORDER BY meal_date DESC;";
    const allMeals = await knex.raw(GET_ALL_MEALS_QUERY);
    res.json({ allMeals });
  } catch (error) {
    console.error("Error fetching all meals:", error);
    res.status(500).json({ error: "Failed to fetch all meals" });
  }
}
);

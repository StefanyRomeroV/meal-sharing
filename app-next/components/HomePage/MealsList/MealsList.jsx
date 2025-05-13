import { useState, useEffect } from "react";

export default function MealsList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const response = await fetch("http://localhost:3001/api/meals");
        const data = await response.json();
        setMeals(data.meals);
      }, 2000);
    };
    fetchData([]);
  }, []);

  return (
    <div>
      <h1>Your Meals</h1>
      {meals.map((meal, index) => (
        <div key={index}>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
            <p>{meal.price}</p>
        </div>
      ))}
    </div>
  );
}

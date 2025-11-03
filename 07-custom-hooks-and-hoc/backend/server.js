import express from "express";
import cors from "cors";
import restaurants from "./restaurants.js";
import restaurantMenu from "./restaurantMenu.js";

const app = express();
const PORT = 5000;

// Allow all origins (for dev)
app.use(
  cors({
    origin: "http://localhost:1234",
  })
);

// API endpoint to fetch restaurants
app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/api/restaurant/menu/:id", (req, res) => {
  const { id } = req.params;

  const menu = restaurantMenu.find(
    (rm) => rm?.cards[2]?.card?.card?.info?.id === id
  );

  if (!menu) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  res.json(menu);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

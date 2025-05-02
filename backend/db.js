
const mongoose = require("mongoose");
require("dotenv").config();

const mongorun = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully");

    const db = mongoose.connection.db;

    // Fetch food_items
    const foodItemsData = await db.collection("food_items").find({}).toArray();

    // Fetch foodCategory
    const foodCategoryData = await db.collection("food_category").find({}).toArray();

    // Store globally
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    // Optional: log the data
    // console.log("🍱 Food Items:");
    // console.log(JSON.stringify(global.food_items, null, 2));
    // console.log("📂 Food Categories:");
    // console.log(JSON.stringify(global.foodCategory, null, 2));

  } catch (err) {
    console.log("❌ MongoDB connection failed:", err);
  }
};

module.exports = mongorun;

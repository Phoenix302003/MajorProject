if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
  const mongoose = require("mongoose");
  const initData = require("./data.js");
  const Listing = require("../models/listing.js");
  
  // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
  const DB_URL = process.env.ATLASDB_URL;
  main()
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log(err));
  
  async function main() {
    //   await mongoose.connect(MONGO_URL);
    await mongoose.connect(DB_URL);
  }
  
  const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6596a27d4059cd81622d9c2e",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  initDB();
  
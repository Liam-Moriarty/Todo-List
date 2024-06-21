// DEPENDENCIES IMPORTS

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// ROUTES IMPORTS
import todoRoutes from "./routes/todo.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES

app.use("/todo", todoRoutes);

// SETUP MONGOOSE/DATABASE

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Connected at Server Port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

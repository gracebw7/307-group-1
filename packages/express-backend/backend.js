// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import propertyServices from "./services/property-service.js";

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/properties", async (req, res) => {
  try {
    const properties = await propertyServices.getProperties();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/properties", async (req, res) => {
  try {
    const newProperty = await propertyServices.addProperty(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

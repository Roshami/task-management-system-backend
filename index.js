import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";
import bodyParser from "body-parser";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors())

app.use(bodyParser.json());





mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));



app.use("/api/users", usersRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

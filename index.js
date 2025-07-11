import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import taskRouter from "./routes/tasksRouter.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors())

app.use(bodyParser.json());

//middleware part for token
app.use((req,res,next)=>{
    let token = req.header("Authorization")
    //console.log(token)

    if(token != null){
        token = token.replace("Bearer ", "")
        
        jwt.verify(token,process.env.JWT_SECRET,
            (err,decoded)=>{
                if(!err){
                    //console.log(decoded)
                    req.user = decoded
                }
            }
        )

    }

    next()
});


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));



app.use("/api/users", usersRouter);
app.use("/api/tasks", taskRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

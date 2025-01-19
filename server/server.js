import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes  from "./routes/authRoute.js";
import postsRoutes from "./routes/postsRoute.js";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8000;


// middlewares

app.use(cors());
app.use(express.json());


// routes

app.use('/api/auth',authRoutes);
app.use('/api/posts', postsRoutes);



app.get("/", (req, res) =>{
  res.send("<h1>Welcome to the server</h1>")
})

app.listen(PORT , () =>{
    console.log(`server listening at port ${PORT}`)
})
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000 ;

dotenv.config();

// Packets → Stream → Object
// Internet sends packets.
// Node reads stream.
// Express makes object.
app.use(express.json()); // to parse the incoming requests with JSON payloads ( from req.body )
app.use(cookieParser()); // parse the cookie to our middleware protectRoute 


app.use ("/api/auth", authRoutes)
app.use ("/api/messages", messageRoutes)
app.use ("/api/users", userRoutes)

app.listen(PORT, ()=>{
    connectToMongoDB();
     console.log(`Server is running on ${PORT}`) 
});


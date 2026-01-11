import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({})
const app = express();

import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import adminRoute from "./routes/admin.route.js"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/post', postRoute)
app.use('/api/v1/admin', adminRoute)

import dbConnection from "./utils/dbConnection.js";
const PORT = process.env.PORT || 4040
app.listen(PORT, async () => {
    if (await dbConnection()) {
        console.log(`Server is running at http://localhost:${PORT}`);
    }
})
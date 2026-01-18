import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"
dotenv.config({})
const app = express();

import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import adminRoute from "./routes/admin.route.js"

const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/post', postRoute)
app.use('/api/v1/admin', adminRoute)

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.use(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

import dbConnection from "./utils/dbConnection.js";
const PORT = process.env.PORT || 4040
app.listen(PORT, async () => {
    if (await dbConnection()) {
        console.log(`Server is running at http://localhost:${PORT}`);
    }
})
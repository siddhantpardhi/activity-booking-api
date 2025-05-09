import express from "express"
import connectDB from "./database/database.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()

// Middlewares
app.use(express.json({ limit: "16kb"} ))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: [ "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD" ],
    allowedHeaders: [ 
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Access-Control-Allow-Origin",
        "Origin",
        "Accept",
    ]
}))

// Routes
import userRoutes from "./routes/user.route.js"
import activityRoutes from "./routes/activity.route.js"

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/activity", activityRoutes)

//Database Connection
connectDB()
    .then((connectionInstance) => {
        console.log(`MongoDB connected DB HOST ${connectionInstance.connection.host}`)

        app.on("error", (error) => {
            console.log("Error: ", error)
            throw error
        })

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
    .catch(error => console.error("Error while connecting to MongoDB ", error))

app.use((req, res) => {
    res.status(404).send('Route not found')
})
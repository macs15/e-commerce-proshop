import express from "express"
import dotenv from "dotenv"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running..")
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

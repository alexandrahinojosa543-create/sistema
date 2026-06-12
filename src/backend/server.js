require("dotenv").config()

const express = require("express") 
const cors = require("cors")

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
/* const userRoutes = require("./routes/userRoutes") */

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)

/* app.use("/api/user", userRoutes) */

app.listen(5000,()=>{
  console.log("Servidor ejecutandose en el puerto: 5000")
})
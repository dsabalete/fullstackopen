require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

const blogsRouter = require("./controllers/blogs")
const config = require("./utils/config")
const { info, error } = require("./utils/logger")

const mongoose = require("mongoose")

info("Connecting to", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    info("🌱 Connected to MongoDB")
  })
  .catch((err) => {
    error("error connecting to MongoDB:", err.message)
  })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

module.exports = app

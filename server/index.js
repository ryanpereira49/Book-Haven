const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/static',express.static('public'))

app.use("/", require("./routes/authRoutes"));
app.use("/book", require("./routes/bookRoutes"));

const PORT = process.env.port || 8000;

// Database Connection and server startup
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => console.log("[Database] : Connected"))
  .catch((err) => console.log("[Database]: Not Connected: ", err))
  .then(() => {
    app.listen(PORT, () => console.log(`[Server]: Running on port ${PORT}`));
  });

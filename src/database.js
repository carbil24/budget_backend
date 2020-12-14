import mongoose from "mongoose";
const dotenv = require("dotenv");

dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import router from "./routes/todos.js";
import signUp from "./routes/signUp.js";
import signIn from "./routes/signIn.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/todos", router);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);

const connection = process.env.api_key;
const port = process.env.PORT || 5000;

mongoose
  .connect(connection)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("mongodb is failed to connect", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

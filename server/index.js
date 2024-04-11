import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import router from "./routes/todos.route.js";
import signUp from "./routes/signUp.route.js";
import signIn from "./routes/signIn.route.js";
import registeredUser from "./routes/registeredUser.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/todo", (req, res) => {
  res.send("Hello World!");
});
//routes
app.use("/api/todos", router);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);
app.use("/api/registereduser", registeredUser);

const connection = process.env.api_key;
const port = process.env.PORT || 5000;

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("mongodb is failed to connect", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

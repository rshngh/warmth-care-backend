import express, { urlencoded } from "express";
import connectDB from "./db.js";
import "dotenv/config";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import cors from "cors";

import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "https://warmth-care-frontend.vercel.app/",
    credentials: true,
  })
);

try {
  app.listen(PORT, () => {
    console.log(`Successfully connected to the server at port ${PORT}.`);
    connectDB(process.env.MONGOURI);
  });
} catch (error) {
  console.log("Error connecting to the server!");
}

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/api/test", (req, res) => {
  return res.send(
    "Welcome to test route. <br/><br/> Here's a joke: <br/> Why do cows wear bells? Their horns do not work."
  );
});

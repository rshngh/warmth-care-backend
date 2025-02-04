import express, { urlencoded } from "express";
import connectDB from "./db.js";
import "dotenv/config";
import { chats } from "./data/data.js";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import cors from "cors";
import { verifyToken } from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

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

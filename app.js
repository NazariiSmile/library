import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bookRouter from "./routes/booksRoutes.js";
import rootErrorHandler from "./controllers/errorAppController.js";

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use("/api/books", bookRouter);

const PORT = process.env.PORT || 3000;
const DB_DATABASE_URL = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.nycrx.mongodb.net/${process.env.DB_DATABASE}`;

const executeConnections = async () => {
  await mongoose
    .connect(DB_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB connection");
    });
  return await app.listen(PORT, (req, res) => {
    console.log("Server is executed");
  });
};
const serverListen = executeConnections();

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection. Reason: ${err.message}`);
  serverListen.close(() => {
    process.exit(1);
  });
});

app.use(rootErrorHandler);
export default app;

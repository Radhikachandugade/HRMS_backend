import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import attendanceRoutes from "./routes/attendenceRoutes.js";
import leaveRequest from "./routes/leaveRoutes.js";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();
app.use(express.json()); /*Parsing http request body*/

const corsOptions = {
  origin: "https://hrms-sigmoid.vercel.app",
  credentials: true /* if you're using cookies or sessions*/,
};

app.use(cors(corsOptions));

app.options("/test-cors", cors(corsOptions), (req, res) => {
  res.status(200).send("CORS enabled");
});

app.get("/test-cors", cors(corsOptions), (req, res) => {
  res.status(200).send("CORS enabled");
});

app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRequest);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

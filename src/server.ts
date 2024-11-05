import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import pageRouter from "./routes/page.routes";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Create server
const app = express();

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", pageRouter);

// 404 Fallback route
app.use((req: Request, res: Response) => {
  res.status(404).send("404");
});

// Start server
const PORT: number = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

import express from "express";
import AuthRoute from "./routes/auth";
import TodoRoute from "./routes/todo";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { connectToDB } from "./utils/connect";
import { ErrorWithStatusCode } from "./interfaces/interface";

const app = express();
// const PORT = 3000;

dotenv.config();

const PORT = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL;

const corsOptions = {
  origin: `${frontendUrl}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

// app.get("/", (req, res, next) => {
//   res.send("hello world vicky");
// });

connectToDB();

app.use(
  (
    err: ErrorWithStatusCode,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({ error: message });
  }
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

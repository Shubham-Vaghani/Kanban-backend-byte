import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/connecion";
import cors from "cors";
import routes from "./routes";
import { ApiError } from "./utils/apiResponse";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        success: false,
        message: err.message,
        errors: err.errors,
      });
    }

    // Default error
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment:- ${process.env.NODE_ENV}`);
});

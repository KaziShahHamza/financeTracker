import express, { Express } from "express";
import mongoose from "mongoose";
import { FinancialRecordRouter } from "./routes/FinancialRecordRouter";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/records", FinancialRecordRouter);

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Atlas Connected`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${(error as Error).message}`);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

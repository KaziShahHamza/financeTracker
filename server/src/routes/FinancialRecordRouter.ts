import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/FinancialRecordModel";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const records = await FinancialRecordModel.find({ userId: id });

    if (records.length === 0) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
    console.log("post e problem");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();
    res.status(200).send("Record updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);

    if (!record) return res.status(404).send();
    res.status(200).send("Record deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

export {router as FinancialRecordRouter};
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface FinancialRecord {
  _id?: string;
  userID: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        "http://localhost:3002/records/" + user?.id
      );
      console.log("Response data: ", response.data);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/records",
        record,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Adding Data: ", response.data);
      setRecords((prev) => [...prev, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/records/${id}`,
        newRecord,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRecords((prev) =>
        prev.map((record) => (record._id === id ? response.data : record))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
    const { data: deletedRecord } = await axios.delete(
      `http://localhost:3002/records/${id}`
    );

    setRecords((prev) =>
      prev.filter((record) => record._id !== deletedRecord._id)
    );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error("Error in FinancialRecordsType");
  }

  return context;
};

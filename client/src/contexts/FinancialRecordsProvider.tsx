import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface FinancialRecord {
  id?: string;
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
  //   updateRecord: (id: string, newRecord: FinancialRecord) => void;
  //   deleteRecord: (id: string) => void;
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

  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord }}>
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

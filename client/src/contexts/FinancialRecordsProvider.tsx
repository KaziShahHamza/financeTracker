import { createContext, useContext, useState } from "react";

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

  const addRecord = async (record: FinancialRecord) => {
    console.log("Submitting Record:", record);
    const response = await fetch("http://localhost:3002/records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      console.log("Entered try");
      if (response.ok) {
        const newRecord = await response.json();
        console.log("New Record: ", newRecord);
        setRecords((prev) => [...prev, newRecord]);
      } else {
        console.log("Response is not OK");
      }
    } catch (err) {
      console.log("Entered catch");
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

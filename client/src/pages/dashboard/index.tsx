import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./FinancialRecordForm";
import FinancialRecordList from "./FinancialRecordList";
import "./FinancialRecord.css";
import { useMemo } from "react";
import { useFinancialRecords } from "../../contexts/FinancialRecordsProvider";

const Dashboard = () => {
  const { user } = useUser();
  const { records} = useFinancialRecords();

  const totolCosts = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1>
        Welcome <span className="user-firstname">{user?.firstName}</span>! Here
        are your Finances:
      </h1>
      <FinancialRecordForm />
      <span className="totalCost">Total monthly Costs: {totolCosts}</span>
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;

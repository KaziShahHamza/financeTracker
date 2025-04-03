import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./FinancialRecordForm";
import FinancialRecordList from "./FinancialRecordList";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your Finances:</h1>
      <FinancialRecordForm />
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;

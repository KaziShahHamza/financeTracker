import "./App.css";
import Auth from "./pages/auth/auth";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinancialRecordsProvider } from "./contexts/FinancialRecordsProvider";

function App() {
  return (
    <Router>
      <div className="app-container"></div>
      <Routes>
        <Route
          path="/"
          element={
            <FinancialRecordsProvider>
              <Dashboard />
            </FinancialRecordsProvider>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;

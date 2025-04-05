import "./App.css";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FinancialRecordsProvider } from "./contexts/FinancialRecordsProvider";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <div className="app-container"></div>
      <div className="navbar">
        <Link to="/" className="dashboard">
          Dashboard
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
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

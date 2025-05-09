import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletConnector from "./components/WalletConnector";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WalletConnector />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

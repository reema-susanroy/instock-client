import WarehousePage from "./pages/WarehousePage/WarehousePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/warehousepage" element={<WarehousePage />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

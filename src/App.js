import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import NotFound from './pages/NotFound/NotFound';
import WarehousePage from './pages/WarehousePage/WarehousePage'
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage'
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import InventoriesPage from './pages/InventoriesPage/InventoriesPage';
import InventoryDetailsPage from './pages/InventoryDetailsPage/InventoryDetailsPage'
import EditInventoryPage from './pages/EditInventoryPage/EditInventoryPage';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage';

function App() {
  return (
   <>
   <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/warehouses" element={<WarehousePage />} />
          <Route path="/warehouses/:warehouseId" element={<WarehouseDetailsPage />}/>
          <Route path="/warehouses/:warehouseId/edit" element={<EditWarehousePage />}/>
          <Route path="/warehouses/add" element={<AddWarehousePage />}/>
          <Route path="/inventories" element={<InventoriesPage />} />
          <Route path="/inventories/:inventoryId" element={<InventoryDetailsPage />}/>
          <Route path="/inventories/:inventoryId/edit" element={<EditInventoryPage />}/>
          <Route path="/inventories/add" element={<AddInventoryPage />}/>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
   </>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./Home.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";


function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  





  return (
    <WarehouseList />
  );
}

export default WarehousePage;

import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import './WarehousePage.scss';

function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWarehouses();
  }, []);

  const getWarehouses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/warehouses"
      );
      setWarehouses(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };


  const handleDeleteWarehouse = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/warehouses/${id}`);
      getWarehouses();
    }
    catch (error) {
      console.log("Unable to Delete warehouse : " + error);
    }

  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="warehouse-list-container">
      <WarehouseList warehouses={warehouses} handleDeleteWarehouse={handleDeleteWarehouse}/>
    </div>
  );
}

export default WarehousePage;

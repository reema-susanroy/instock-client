import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import './WarehousePage.scss';

function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/warehouses"
        );
        setWarehouses(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    getWarehouses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="warehouse-list-container">
      <WarehouseList warehouses={warehouses} />
    </div>
  );
}

export default WarehousePage;

import { useState, useEffect } from "react";
import axios from "axios";

import "./Home.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";

function WarehousePage() {
  const [ warehouses, setWarehouses ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await axios.get('/api/warehouses');
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
  
  <WarehouseList warehouses={warehouses} />
  );
}

export default WarehousePage;

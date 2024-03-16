import "./InventoriesPage.scss";
import InventoryList from "../../components/InventoryList/InventoryList";
import { useState, useEffect } from "react";
import axios from "axios";

function InventoriesPage() {
  const base_url = "http://localhost:5000";
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInventoriesList();
  }, []);

  const getInventoriesList = async () => {
    try {
      const response = await axios.get(`${base_url}/api/inventories`);
      setInventories(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

    if (isLoading) {
      return <div>Loading Inventories...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  };

  const handleDeleteInventory = async (id) => {
    try {
      await axios.delete(`${base_url}/api/inventories/${id}`);
      getInventoriesList();
    }
    catch (error) {
      console.log("Unable to Delete inventory : " + error);
    }

  }

 


  return (
    <div className="warehouse-list-container">
      <InventoryList inventories={inventories} handleDeleteInventory={handleDeleteInventory}/>
    </div>
  );
}

export default InventoriesPage;

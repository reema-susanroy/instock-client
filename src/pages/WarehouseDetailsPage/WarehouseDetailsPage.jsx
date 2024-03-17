import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import "./WarehouseDetailsPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function WarehouseDetailsPage() {
  const server_url = "http://localhost:5000";
  const { warehouseId } = useParams();
  const [inventoryData, setInventoryData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    const fetchWarehouseDetails = async (id) => {
      const response = await axios.get(`${server_url}/api/warehouses/${id}`);
      // console.log(response.data);
      setCurrentData(response.data);
    };

    fetchWarehouseDetails(warehouseId);
  }, [warehouseId]);


  const fetchWarehouseInventory = async () => {
    try {
      // console.log("url", `${server_url}/api/warehouses/${warehouseId}/inventories/ \n`);
      const response = await axios.get(
        `${server_url}/api/warehouses/${warehouseId}/inventories/`
      );
      // console.log("inventoryData", response.data);
      setInventoryData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouseInventory(warehouseId);
  }, [warehouseId]);

  const handleDeleteWarehouse = async (id) => {
    try {
      await axios.delete(`${server_url}/api/warehouses/${warehouseId}/inventories/${id}`);
      fetchWarehouseInventory();
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

  console.log(currentData);

  return (
    <>
      <main className="">
        <div className="warehouse-details-page">
          <section className="warehouse-details-body">
            <WarehouseDetails currentData={currentData} />
            <WarehouseInventoryList
              inventories={inventoryData}
              warehouseName={currentData.warehouse_name}
              warehouseId={currentData.id}
              handleDeleteWarehouse={handleDeleteWarehouse}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default WarehouseDetailsPage;

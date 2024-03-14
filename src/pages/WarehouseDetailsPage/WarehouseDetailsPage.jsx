import './WarehouseDetailsPage.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InventoryList from '../../components/WarehouseInventoryList/WarehouseInventoryList';

function WarehouseDetailsPage() {
    const server_url= 'http://localhost:5000';
    const { warehouseId } = useParams();
    console.log("test", warehouseId);

    const [inventoryData, setInventoryData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchWarehouseInventory = async () => {
            try {
                console.log("url", `${server_url}/api/warehouses/${warehouseId}/inventories/ \n`);
                const response = await axios.get(`${server_url}/api/warehouses/${warehouseId}/inventories/`)
                console.log("inventoryData", response.data);
                setInventoryData(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        }
        fetchWarehouseInventory(warehouseId);
    }, [warehouseId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log("test2", inventoryData)


    return(
        <>
        <InventoryList inventories={inventoryData}/>
        </>
    )
}

export default WarehouseDetailsPage;
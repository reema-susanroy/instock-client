import "./InventoryDetailsPage.scss";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-24px-white.svg";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
function InventoryDetailsPage(){

    const base_url = 'http://localhost:5000';
    const { inventoryId } = useParams();
    const [currentData, setCurrentData] =useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [warehouses, setWarehouses] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventoryResponse = await axios.get(`${base_url}/api/inventories/${inventoryId}`);
                setCurrentData(inventoryResponse.data);
                
                const warehousesResponse = await axios.get(`${base_url}/api/warehouses`);
                setWarehouses(warehousesResponse.data);

                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [inventoryId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    // Ensure currentData is not null before accessing its properties
    if (!currentData) {
        return <div>No data available</div>;
    }

    const warehouse = warehouses.find(warehouse => warehouse.id === currentData.warehouse_id);

  return (
    <section className="inventory-details-page">
      <section className="inventory-detail">
        <div className="inventory-detail-title">
          <div className="inventory-detail-title-wrapper">
            <Link to="/inventories">
              <img
                src={arrowBack}
                alt="Arrow Back Icon"
                className="inventory-detail-title__icon"
              />
            </Link>
            <h1 className="inventory-detail-title__cont">
              {currentData.item_name}
            </h1>
          </div>
          <Link to={`/inventories/${currentData.id}/edit`}>
            <img
              src={editIcon}
              alt="Edit Icon"
              className="inventory-detail-title__edit"
            />
          </Link>
        </div>
        <section className="inventory-detail-content">
          <div className="inventory-detail-content-left">
            <h4 className="inventory-detail-content__title">
              ITEM DESCRIPTION:
            </h4>
            <p className="inventory-detail-content__details">
              {currentData.description}
            </p>

            <h4 className="inventory-detail-content__title">CATEGORY:</h4>
            <p className="inventory-detail-content__details">
              {currentData.category}
            </p>
          </div>
          <div className="inventory-detail-content-right">
            <div className="inventory-detail-content-wrapper">
              <div className="inventory-detail-content-wrapper-left">
                <h4 className="inventory-detail-content__title">STATUS:</h4>
                <p className="inventory-detail-content__details--status">
                  {currentData.status}
                </p>
              </div>
              <div className="inventory-detail-content-wrapper-right">
                <h4 className="inventory-detail-content__title">QUANTITY:</h4>
                <p className="inventory-detail-content__details">
                  {currentData.quantity}
                </p>
              </div>
            </div>
            <h4 className="inventory-detail-content__title">WAREHOUSE:</h4>
            <p className="inventory-detail-content__details">
              {warehouse.warehouse_name}
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default InventoryDetailsPage;

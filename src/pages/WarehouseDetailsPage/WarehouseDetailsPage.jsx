import './WarehouseDetailsPage.scss'
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function WarehouseDetailsPage() {
    const base_url= 'http://localhost:3000';
    const { warehouseId } = useParams();
    const [currentData, setCurrentData] =useState();

    useEffect(() => {
        const fetchWarehouseDetails = async (id) => {
            const response = await axios.get(`${base_url}/api/warehouses/${id}`)
            console.log(response.data);
            setCurrentData(response.data);
        }

        fetchWarehouseDetails(warehouseId);

    }, [warehouseId]);

    return (
        <main className='page__background'>
        <div className='page__allignment'> 
        <WarehouseDetails currentData={currentData}/>



        </div>
        </main>
    )
}

export default WarehouseDetailsPage;
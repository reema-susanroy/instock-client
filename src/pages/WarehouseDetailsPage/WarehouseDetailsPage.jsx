import './WarehouseDetailsPage.scss'
import WarehouseDetails from '../../components/WarehouseDetails/WarehouseDetails'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from '../NotFound/NotFound';

function WarehouseDetailsPage() {
    const base_url = 'http://localhost:3000';
    const { warehouseId } = useParams();
    const [currentData, setCurrentData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWarehouseDetails = async (id) => {
            try {
                const response = await axios.get(`${base_url}/api/warehouses/${id}`)
                console.log(response.data);
                setCurrentData(response.data);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(true);
                setError(true);
            }
        }

        fetchWarehouseDetails(warehouseId);

    }, [warehouseId]);

    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return (<NotFound />);
      }
    

    return (
        <main className='page__background'>
            <div className='page__allignment'>
                <WarehouseDetails currentData={currentData} />



            </div>
        </main>
    )
}

export default WarehouseDetailsPage;
import EditInventory from '../../components/EditInventory/EditInventory';
import './EditInventoryPage.scss';
import { useLocation } from "react-router-dom";


function EditInventoryPage() {
    const location = useLocation();
    const { inventory, warehouseName, warehouseId, thisPath} = location.state;
    return (
        <div className='edit-inventory-page'>
            <EditInventory inventory={inventory}  warehouseName={warehouseName} warehouseId={warehouseId} thisPath={thisPath}/>
        </div>
    )
}

export default EditInventoryPage;
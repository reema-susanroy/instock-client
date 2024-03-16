import EditInventory from '../../components/EditInventory/EditInventory';
import './EditInventoryPage.scss';
import { useLocation } from "react-router-dom";


function EditInventoryPage() {
    const location = useLocation();
    const { inventory, warehouseName, warehouseId, thisPath} = location.state;
    return (
        <>
            <EditInventory inventory={inventory}  warehouseName={warehouseName} warehouseId={warehouseId} thisPath={thisPath}/>
        </>
    )
}

export default EditInventoryPage;
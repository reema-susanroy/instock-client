import EditInventory from '../../components/EditInventory/EditInventory';
import './EditInventoryPage.scss';
import { useLocation } from "react-router-dom";


function EditInventoryPage() {
    const location = useLocation();
    const { inventory, warehouseName } = location.state;
    return (
        <>
            <EditInventory inventory={inventory}  warehouseName={warehouseName}/>
        </>
    )
}

export default EditInventoryPage;
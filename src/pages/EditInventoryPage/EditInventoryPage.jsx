import EditInventory from '../../components/EditInventory/EditInventory';
import './EditInventoryPage.scss';
import { useLocation } from "react-router-dom";


function EditInventoryPage() {
    const location = useLocation();
    console.log(location)
    const { inventory, warehouseName, warehouseId, thisPath} = location.state;
    console.log("Edit invntory page")
    console.log(inventory,warehouseId,warehouseName)
    return (
        <>
            <EditInventory inventory={inventory}  warehouseName={warehouseName} warehouseId={warehouseId} thisPath={thisPath}/>
        </>
    )
}

export default EditInventoryPage;
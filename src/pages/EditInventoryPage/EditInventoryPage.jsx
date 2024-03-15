import EditInventory from '../../components/EditInventory/EditInventory';
import './EditInventoryPage.scss';
import { useLocation } from "react-router-dom";


function EditInventoryPage() {
    const location = useLocation();
    const { inventory } = location.state;
    return (
        <>
            <EditInventory inventory={inventory}/>
        </>
    )
}

export default EditInventoryPage;
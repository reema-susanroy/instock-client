import AddInventoryItem from "../../components/AddInventoryItem/AddInventoryItem";
import { useLocation } from "react-router-dom";

function AddInventoryPage() {
    // const location = useLocation();
    // const { inventory, warehouseName,warehouseId } = location.state;

    return (
        <>
        <AddInventoryItem />
        </>
    )
}

export default AddInventoryPage;


import InventoryItem from '../WarehouseInventoryItem/WarehouseInventoryItem';
import './WarehouseInventoryList.scss';
import { ReactComponent as SortIcon } from '../../assets/icons/sort-24px.svg';
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";

function InventoryList({ inventories, warehouseName , warehouseId}) {

    return(
       <main className='inventory-list-wrapper'>
            <section className='inventory-list'>
                <div className='inventory-list__title'>
                    <h4>INVENTORY ITEM</h4><SortIcon />
                </div>
                <div className='inventory-list__title'>
                    <h4>CATEGORY</h4><SortIcon />
                </div>
                <div className='inventory-list__title'>
                    <h4>STATUS</h4><SortIcon />
                </div>
                <div className='inventory-list__title'>
                    <h4>QUANTITY</h4><SortIcon />
                </div>
                <div className='inventory-list__title'>
                    <h4>ACTIONS</h4>
                </div>
            </section>
             <ul className='inventory-list'>
                {inventories.map((inventory) =>(
                    <InventoryItem key={inventory.id} inventory={inventory} warehouseName={warehouseName} warehouseId={warehouseId}/>
                ))}
             </ul>

       </main>
    );
}

export default InventoryList;
import WarehouseInventoryItem from '../WarehouseInventoryItem/WarehouseInventoryItem';
import './WarehouseInventoryList.scss';
import { ReactComponent as SortIcon } from '../../assets/icons/sort-24px.svg';
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";

function WarehouseInventoryList({ inventories, warehouseName , warehouseId}) {

    return(
       <section className='warehouse-list'>
            <section className="warehouse-list-titles__desktop">
                <div className='warehouse-list__title'>
                    <h4>INVENTORY ITEM</h4>
                    <SortIcon className="warehouse-list__sort-icon" />
                </div>
                <div className='warehouse-list__title'>
                    <h4>CATEGORY</h4>
                    <SortIcon className="warehouse-list__sort-icon" />
                </div>
                <div className='warehouse-list__title'>
                    <h4>STATUS</h4>
                    <SortIcon className="warehouse-list__sort-icon" />
                </div>
                <div className='warehouse-list__title warehouse-list__title-contact-information'>
                    <h4>QUANTITY</h4>
                    <SortIcon className="warehouse-list__sort-icon" />
                </div>
                <div className="warehouse-list__title warehouse-list__title-actions">
                    <h4>ACTIONS</h4>
                </div>
            </section>
                <ul className='warehouse-list'>
                    {inventories.map((inventory) =>(
                        <WarehouseInventoryItem key={inventory.id} inventory={inventory} warehouseName={warehouseName} warehouseId={warehouseId}/>
                    ))}
                </ul>
       </section>
    );
}

export default WarehouseInventoryList;
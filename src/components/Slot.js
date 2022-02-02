import React, { useContext } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { GlobalContext } from '../context/GlobalState';

export const Slot = ({rowIndex, parkingSlotIndex, slotIndex, slot}) => {
    const { unParkCars } = useContext(GlobalContext);

    const { id, plateNumber, size, slotLocation, timeIn, originalTimeIn, timeOut} = slot;

    // get the size of the car based on its index
    const getSize = (sizeIndex) => {
        return !sizeIndex? '': sizeIndex === '0'? 'S': sizeIndex === '1'? 'M': 'L';
    }
    // do not display plateNumber if car has timeOut value (served as unpark car)
    const plateNum = !timeOut && plateNumber ? plateNumber : '-';
    // the size of the car parked on this slot
    const carParkedSize = timeOut ? '' : getSize(slot.size);

    const onClickSlot = () => {
        if (!plateNumber) return;
        unParkCars({
            id,
            plateNumber,
            size,
            slotLocation,
            timeIn,
            originalTimeIn,
            timeOut: new Date().toISOString(),
            wasParked: false
        });
    }
    
    return (
        <div className="slot"
            onClick={onClickSlot}>
            <div className={`size size-${getSize(slotIndex)}`}>
                <span className='car-parked-size'>{carParkedSize}</span>
                <span className="slot-number">{`${rowIndex}-${parkingSlotIndex}-${slotIndex}`}</span>
                <div className="slot-content">
                    <div className="plate-number">
                        <MdDirectionsCar size="2em" className='car-icon'/>
                        <span>{plateNum}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

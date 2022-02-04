import React, { useContext } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { GlobalContext } from '../context/GlobalState';

import { UnparkModal } from './UnparkModal';

export const Slot = ({rowIndex, parkingSlotIndex, slotIndex, slot}) => {
    const { unParkCars, parkedCars, toggleModal, modalState } = useContext(GlobalContext);

    const { id, plateNumber, size, slotLocation, timeIn, originalTimeIn} = slot;

    // get the size of the car based on its index
    const getSize = (sizeIndex) => {
        return !sizeIndex? '': sizeIndex === '0'? 'S': sizeIndex === '1'? 'M': 'L';
    }

    // the size of the car parked on this slot
    const carParkedSize = slotLocation ? getSize(size) : '';

    const onClickSlot = () => {
        if (!slotLocation) return;
        toggleModal(id);
    }
    
    return (
        <>
            { modalState === id && 
                <UnparkModal slot={slot} slotIndex={slotIndex}/>
            }
            <div className="slot"
                onClick={() => slotLocation ? onClickSlot() : ''}>

                <div className={`size size-${getSize(slotIndex)}`}>
                    <span className='car-parked-size'>{carParkedSize}</span>
                    <span className="slot-number">{`${rowIndex}-${parkingSlotIndex}-${slotIndex}`}</span>
                    <div className="slot-content">
                        <div className="plate-number">
                        { slotLocation &&
                            <>
                                <MdDirectionsCar size="2em" className='car-icon'/>
                                <span>{plateNumber}</span>
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

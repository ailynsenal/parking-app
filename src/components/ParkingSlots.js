import React from 'react';
import { Slot } from './Slot';

export const ParkingSlots = ({rowIndex, parkingSlotIndex, rows}) => {
    return (
        <div className={`tile slot-${parkingSlotIndex}`}>
            { rows.length > 0 && 
                rows.map((slot, index) => (<Slot key={index} rowIndex={rowIndex} parkingSlotIndex={parkingSlotIndex} slotIndex={index.toString()} slot={slot} />))
            }
        </div>
    );
};
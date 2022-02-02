import React from 'react';
import { ParkingSlots } from './ParkingSlots';

export const Rows = ({ rowIndex, rows }) => {
  return (
    <div className={`row row-${rowIndex}`}>
        { rows.length > 0 && 
          rows.map((row, index) => (<ParkingSlots key={index} rowIndex={rowIndex} parkingSlotIndex={index} rows={row} />))
        }
    </div>
  );
};


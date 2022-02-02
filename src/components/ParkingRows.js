import React, {useContext, useEffect} from 'react';
import { Entrance } from './Entrance';
import { Rows } from './Rows';
import { ImSpinner } from "react-icons/im";
import { GlobalContext } from '../context/GlobalState';

export const ParkingRows = () => {
    const { getAddedEntrances, addEntrances, addedEntranceList, deleteEntrance, getParkedCars, parkingLots, isLoading, isError } = useContext(GlobalContext);

    // initial data for the 3 default entrances
    const entrances = [{}, {}, {}];
    
    useEffect(() => {
        getAddedEntrances();
        getParkedCars();
    }, []);

    const onClickAddEntrance = () => {
        addEntrances({
            "toAddEntrance": true,
        });
    }

    const onDeleteEntrance = () => {
        deleteEntrance({});
    }

    return (
        <div className="parking-lot-wrapper">
            { isLoading && !isError && parkingLots.length === 0 && 
                <div className="loading">
                    <span>
                        <ImSpinner className="animate-spin" size="5em" />
                        No parking available.
                    </span>
                </div>
            }
            { !isLoading && !parkingLots.length && !isError &&
                <span>No Slots to display.</span>
            }
            { isLoading && !parkingLots.length && isError &&
                <span>Failed to load the slots!</span>
            }
            { (parkingLots && parkingLots.length > 0 && 
                <>
                    <div className="action-buttons">
                        <button type="button"
                            className={`add-entry ${ addedEntranceList && addedEntranceList.length >= 3 ? 'disabled' : ''}`}
                            onClick={onClickAddEntrance}>
                            ADD ENTRANCE
                        </button>
                        <button type="button"
                            className={`delete-entry ${ addedEntranceList && addedEntranceList.length === 0 ? 'disabled' : ''}`}
                            onClick={onDeleteEntrance}>
                            DELETE ENTRANCE
                        </button>
                    </div>
                    <div className="entrances">
                        {(entrances && entrances.map((ent, index) => (
                            <Entrance key={index} entranceNumber={index + 1} index={index} />
                        )))}
                    </div>
                </>
            )
            }
            { (parkingLots && parkingLots.length > 0) && 
                parkingLots.map((rows, index) => (
                    <Rows key={index} rowIndex={index} rows={rows} /> )
                )
            }
            <div className="entrances">
                { (addedEntranceList && addedEntranceList.length > 0) &&
                    addedEntranceList.map((ent, index) => (
                        <Entrance key={index} entranceNumber={entrances.length + index + 1} index={index} /> )
                )
                }
            </div>
        </div>
    );
};

import { MdBreakfastDining } from "react-icons/md";

export default (state, action) => {
    switch(action.type) {
        case 'GET_ADDED_ENTRANCES':
            return {
                ...state,
                addedEntranceList: action.payload,
                isLoading: false,
                isError: false,
            }
        case 'ADD_ENTRANCE':
            return {
                ...state,
                addedEntranceList: [action.payload, ...state.addedEntranceList],
                isLoading: false,
                isError: false,
            }
        case 'DELETE_ENTRANCE':
            // need to check the length of the addedEntrances so we can delete based on last added entrance
            let entranceToDelete = state.addedEntranceList.length;
            return {
                ...state,
                addedEntranceList: entranceToDelete === 0 ? [] : state.addedEntranceList.filter(entrance => entrance.id !== entranceToDelete),
                isLoading: false,
                isError: false,
            }
        case 'GET_PARKED_CARS':
            return {
                ...state,
                parkedCars: action.payload,
                isLoading: false,
                isError: false,
            }
        case 'PARK_CARS':
            return {
                ...state,
                parkingLots: state.parkingLots,
                parkedCars: [action.payload, ...state.parkedCars],
                isLoading: false,
                isError: false,
            }
        case 'UNPARK_CARS':
            let { id } = action.payload;
            let parkedCarsList = state.parkedCars;
            parkedCarsList.find(car => {
                if (car.id === id) {
                    car.slotLocation = action.payload.slotLocation;
                    return car;
                }
            });
            return {
                ...state,
                parkingLots: state.parkingLots,
                parkedCars: parkedCarsList,
                isLoading: false,
                isError: false,
            }
        case 'UPDATE_PARKING_LISTS':
            let { slotLocation } = action.payload;
            if (slotLocation) {
                let splitLocation = slotLocation.split('');
                state.parkingLots[parseInt(splitLocation[0])][parseInt(splitLocation[1])][parseInt(splitLocation[2])] = action.payload;
            }
            return {
                ...state,
                parkingLots: state.parkingLots,
                isLoading: false,
                isError: false
            }
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modalState: action.payload
            }
        case 'ERROR':
            return {
                ...state,
                isError: action.payload
            }
        default:
            return state;
    }
}
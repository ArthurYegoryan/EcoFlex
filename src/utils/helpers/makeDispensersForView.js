import { makeFuelTypesList } from "./makeFuelTypesList";

export const makeDispensersForView = (dispensers) => {
    const resultArr = [];

    dispensers.map((dispenser) => {
        resultArr.push({
            ...dispenser,
            address: dispenser.station.address,
            stationName: dispenser.station.name,
            stationGroupName: dispenser.station.stationGroup.name,
            fuelTypes: makeFuelTypesList(dispenser.fuelTypes, true)
        });
    });

    return resultArr;
};
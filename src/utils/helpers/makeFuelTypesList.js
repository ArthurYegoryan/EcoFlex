export const makeFuelTypesList = (items, isAll = false) => {
    if (!isAll) {
        items.map((item) => {
            const itemFuelTypesList = [];
    
            item.fuelTypes.map((itemFuelType) => {
                itemFuelTypesList.push(`${itemFuelType.name} (${itemFuelType.countType})`);
            });
            item.fuelTypes = itemFuelTypesList;
        });

        return items;
    } else {
        const itemFuelTypesList = [];

        items.map((item) => {
            itemFuelTypesList.push(`${item.name} (${item.countType})`);
        });

        return itemFuelTypesList;
    }
};
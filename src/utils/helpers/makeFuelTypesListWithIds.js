export const makeFuelTypesListWithIds = (list, allFuelTypes) => {
    const listIds = [];

    list.map((item) => {
        for (let i = 0; i < allFuelTypes.length; i++) {
            let sliceCount = 0;
            if (item[item.length - 2] === "L") sliceCount = 4;
            else sliceCount = 5;

            if (item.slice(0, item.length - sliceCount) === allFuelTypes[i].name) {
                listIds.push(allFuelTypes[i].id);
                break;
            }
        }
    })

    return listIds;
};
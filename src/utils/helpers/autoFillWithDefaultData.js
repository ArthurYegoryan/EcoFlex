export const autoFillWithDefaultData = (defaultData, newData) => {
    for (const field in newData) {
        if (!newData[field]) newData[field] = defaultData[field];
    }

    return newData;
};
export const isChangedAnyData = (oldData, newData) => {
    for (const field in newData) {
        if (newData[field] !== oldData[field]) return true;
    }

    return false;
};
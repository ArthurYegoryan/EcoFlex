export const addNumeration = (items, currentPage, pageSize, reversed = false, count) => {
    if (!reversed) {
        items.map((item) => {
            item.number = items.indexOf(item) + 1 + (currentPage - 1) * pageSize;
        });
    } else {
        items.map((item) => {
            item.number = count - items.indexOf(item) - (currentPage - 1) * pageSize;
        });
    }    

    return items;
};
export const onlyNumbersPointValidation = (field) => {
    return /^\d+(\.\d+)?$/.test(field);
};
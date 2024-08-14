export const tinValidation = (field) => {
    return /^[0-9]{8}$/.test(field);
}
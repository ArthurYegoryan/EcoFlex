export const makeTransactionsForView = (transactions) => {
    transactions.map((transaction) => {
        transaction.tin = transaction.station.tin;
        transaction.stationName = transaction.station.name;
        transaction.stationGroupName = transaction.station.stationGroup.name;
        transaction.fuelTypeName = transaction.fuelType.name;
        transaction.fuelSizeCountType = transaction.fuelSize + " " + transaction.fuelType.countType;
        transaction.amountCurrency = transaction.amount + " AMD";
        transaction.ecrStatus = transaction.tax.currentTaxStatus;
        transaction.receiptId = transaction.tax.receiptId;
    });

    return transactions;
};
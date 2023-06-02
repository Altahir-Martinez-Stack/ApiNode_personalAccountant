const validateEntriesDetail = (
    detail,
    res,
    msg = { msg: "Bad Request. Please Fill all fields" }
) => {
    if (!detail.detailTypeId || !detail.name || detail.amount == null || !detail.amountOfMoney)
        return res.status(400).json(msg)
}

export default validateEntriesDetail
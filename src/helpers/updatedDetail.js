import { Detail } from "../models/Details"

async function updatedDetail(id, detail) {
    try {
        const updateValues = {}
        if (detail.detailTypeId) updateValues.detailTypeId = detail.detailTypeId
        if (detail.name) updateValues.name = detail.name
        if (detail.amount) updateValues.amount = detail.amount
        if (detail.amountOfMoney) updateValues.amountOfMoney = detail.amountOfMoney
        if (detail.description) updateValues.description = detail.description
        if (detail.jobDate) updateValues.jobDate = detail.jobDate
        if (detail.date) updateValues.date = detail.date
        if (detail.userId) updateValues.userId = detail.userId


        const foundDetail = await Detail.update(
            updateValues,
            { where: { id } }
        )
        return { status: true, data: foundDetail[0] }

    } catch (error) {
        return { status: false, error: error.message }
    }
}

export default updatedDetail
import { Detail } from "../models/Details"

async function updatedDetail(detail) {
    try {
        const foundDetail = await Detail.findByPk(detail.id)

        foundDetail.detailTypeId = detail.detailTypeId
        foundDetail.name = detail.name
        foundDetail.amount = detail.amount
        foundDetail.amountOfMoney = detail.amountOfMoney
        foundDetail.description = detail.description
        foundDetail.jobDate = detail.jobDate
        foundDetail.date = detail.date
        await foundDetail.save()
        return { status: true, data: foundDetail.dataValues }

    } catch (error) {
        return { status: false, error: error.message }
    }
}

export default updatedDetail
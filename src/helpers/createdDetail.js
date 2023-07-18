import { Detail } from "../models/Details";

async function createdDetail(detail) {
    try {
      const newDetail = await Detail.create({
        detailTypeId: detail.detailTypeId,
        name: detail.name,
        amount: detail.amount,
        amountOfMoney: detail.amountOfMoney,
        description: detail.description,
        jobDate: detail.jobDate,
        date: detail.date,
        userId: detail.userId
      });
      return { status: true, data: newDetail.dataValues }
    } catch (error) {
      return { status: false, error: error.message }
    }
  }

  export default createdDetail
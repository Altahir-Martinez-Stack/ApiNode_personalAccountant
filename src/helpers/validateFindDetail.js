import { Detail } from "../models/Details";

const validateFindDetail = async (id, res) => {
    //hace una busqueda con el id en la tabla DetailType
    const foundDetail = await Detail.findOne({ where: { id } });
    //Valida si existe el detail
    if (!foundDetail)
        return res.status(400).json({ msg: "Bad Request. That detail was not found" })

    return foundDetail
}

export default validateFindDetail
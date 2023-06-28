import createdDetail from "../helpers/createdDetail";
import isNotArray from "../helpers/isNotArray";
import updatedDetail from "../helpers/updatedDetail";
import validateEntriesDetail from "../helpers/validateEntriesDetail";
import validateFindDetail from "../helpers/validateFindDetail";
import whereCaseInsensitive from "../helpers/whereCaseInsensitive";
import { DetailType } from "../models/DetailTypes";
import { Detail } from "../models/Details";
import { Op } from 'sequelize'

//muestra todos de la tabla detailexport 
export const getDetail = async (req, res) => {
  const userId = req.user.id // set parameter from token

  try {
    const detail = await Detail.findAll({
      where: { userId },
      include: DetailType, // muestra un nueva propiedad "detailType" extendiendo la tabla detailtypes
      order: [["date", "DESC"]], // muestra en orden a la fecha de forma descente
    });
    return res.json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//muestra por id de la tabla detail
export const getDetailById = async (req, res) => {
  //Datos que se envias desde el front
  const { id } = req.params;

  if (id == null) res.status(400).json({ msg: "Id es nulo" })

  try {
    const detail = await validateFindDetail(id, res)
    return res.send(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//creat varios registro en la tabla Detail
export const createNewDetails = async (req, res) => {
  const details = req.body
  const userId = req.user.id // set parameter from token

  if (isNotArray(details))
    return res.status(400).json({ msj: "Bad Request. fill in the details" })

  try {
    const newDetails = []
    for (let detail of details) {
      validateEntriesDetail(detail, res, { msg: "Bad Request. Please Fill all fields", detail })

      const changeDetail = { ...detail, userId }
      const { id } = detail

      //hace una busqueda con el id en la tabla DetailType
      const validateDetail = await Detail.findOne({ where: { id } });

      // validate for update Detail
      if (validateDetail && id) {
        const foundDetail = await updatedDetail(changeDetail);
        if (foundDetail.status) newDetails.push({ status: "updated", ...foundDetail.data })

      } else { //created detail
        const newDetail = await createdDetail(changeDetail);
        if (newDetail.status) newDetails.push({ status: "created", ...newDetail.data, })
      }
    }

    Promise.all(newDetails).then(result => res.json(result))
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//crear un nuevo registro en la tabla Detail
export const createNewDetail = async (req, res) => {
  const detail = req.body
  const userId = req.user.id // set parameter from token

  await validateEntriesDetail(detail, res)

  try {
    const newDetail = await createdDetail({ ...detail, userId })
    if (newDetail.status)
      return res.send("creating Detail");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//actualizar un registro en la tabla Detail
export const updateDetail = async (req, res) => {
  const { id } = req.params
  const detail = req.body
  const userId = req.user.id // set parameter from token

  validateEntriesDetail(detail, res)

  try {
    await validateFindDetail(id, res)
    const foundDetail = await updatedDetail(id, { ...detail, userId })
    if (foundDetail.status) return res.json({ message: "updated successfull" })
    res.status(400).json({ message: foundDetail.error })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//eliminar un registro en la tabla Detail
export const deleteDetail = async (req, res) => {
  //Datos que se envias desde el front
  const { id } = req.params;
  if (id == null) return res.status(400).json({ msg: "Id es nulo" })

  try {
    await validateFindDetail(id, res)

    //Elimina
    await Detail.destroy({ where: { id } })
    return res.send("confirmed request: item was removed");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// elimar details

export const deleteDetails = async (req, res) => {
  const { search, ids } = req.query

  try {
    let where = {}
    //borrar por busqueda por nombre o descripción
    if (search) {
      where = {
        [Op.or]: [
          { name: whereCaseInsensitive('name', search) },
          { description: whereCaseInsensitive('description', search) }
        ]
      }
    }
    //borrar por ids
    if (ids) {
      const id = ids.split(',').map(id => parseInt(id))
      where = { id }
    }

    await Detail.destroy({ where });
    return res.send("confirmed request: all removed");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//buscar por name registro en la tabla Detail
export const searchDetail = async (req, res) => {
  //Datos que se envias desde el front
  const { search } = req.body;
  const numberMin = 3

  //valite empty or not string
  if (!search || typeof search !== 'string')
    return res.status(400).json({ msg: "Bad Request. Can not do the search" })
  //Validate min search number 
  if (search.length < numberMin)
    return res.status(400).json({ message: "Bad Request. Only " + numberMin + " letters are allowed" })

  try {
    //Hace la busqueda de la tabla Detail por el nombre y description
    const detail = await Detail.findAndCountAll({
      order: [["date", "DESC"]], //order descendente
      where: {
        [Op.or]: [
          { name: whereCaseInsensitive('name', search) },
          { description: whereCaseInsensitive('description', search) }
        ]
      },
    })

    if (detail.count === 0) return res.status(400).json({ msg: "Not found!" })
    return res.send(detail.rows)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

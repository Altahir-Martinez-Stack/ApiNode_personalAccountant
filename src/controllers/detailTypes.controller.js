import { DetailType } from "../models/DetailTypes.js";
const { Op } = require("sequelize");

export const getDetailType = async (req, res) => {
  const userId = req.user.id

  try {
    const detailTypes = await DetailType.findAll({
      where: { userId }
    })
    res.json(detailTypes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Busca por id
export const getDetailTypeById = async (req, res) => {
  //Datos que se envias desde el front
  const { id } = req.params;

  //valida si es null o no
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" })
  }
  try {
    //hace una busqueda con el id en la tabla DetailType
    const detailType = await DetailType.findOne({
      where: {
        id,
      },
    });
    if (!detailType) {
      return res.status(404).json({ message: "Detailtype does not exists" });
    }

    res.send(detailType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNewDetailType = async (req, res) => {
  //Datos que se envias desde el front
  const { nameNumber, name, tags, date } = req.body
  const userId = req.user.id 

  //Valida si es null
  if (nameNumber == null || name == null || tags == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  //toma la fecha actual
  var date_time = new Date();

  try {
    //creando un nuevo elemento de la tabla DetailType
    const newDetailType = await DetailType.create({
      nameNumber,
      name,
      tags,
      userId,
      date: date_time,
    });

    res.json(newDetailType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDetailType = async (req, res) => {
  //Datos que se envias desde el front
  const { nameNumber, name, tags } = req.body
  const { id } = req.params

  //valida si es null o no
  if (nameNumber == null || name == null || tags == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    //hace una busqueda con el id en la tabla DetailType
    const validateDetailType = await DetailType.findOne({
      where: {
        id,
      },
    });

    //Valida si existe el id
    if (!validateDetailType) {
      return res
        .status(400)
        .json({ msg: "Bad Request. That element was not found" });
    }

    //busca por el id
    const detailType = await DetailType.findByPk(id);

    detailType.nameNumber = nameNumber;
    detailType.name = name;
    detailType.tags = tags;
    //Guarda
    await detailType.save();

    res.json(detailType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un registro
export const deleteDetailType = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }
  try {
    //hace una busqueda con el id en la tabla DetailType
    const validateDetailType = await DetailType.findOne({
      where: {
        id,
      },
    });

    //Valida si existe el id
    if (!validateDetailType) {
      return res
        .status(400)
        .json({ msg: "Bad Request. That element was not found" });
    }

    //Elimina
    await DetailType.destroy({
      where: {
        id,
      },
    });
    res.send("confirmed request: item was removed");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//busca por name registro en la tabla Detail (revisar despues)
export const searchDetailType = async (req, res) => {
  const { search } = req.body;

  if (search == null) {
    return res.status(400).json({ msg: "Bad Request. Can not do the search" });
  }
  //Validate Number
  var num = 3;
  if (search.length == num) {
    return res
      .status(400)
      .json({ message: "Bad Request. Only " + num + " letters are allowed" });
  }

  try {
    //Hace la busqueda
    const detailType = await DetailType.findOne({
      where: {
        name: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    if (detailType === null) {
      return res.status(400).json({ msg: "Not found!" });
    } else {
      res.send(detailType);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

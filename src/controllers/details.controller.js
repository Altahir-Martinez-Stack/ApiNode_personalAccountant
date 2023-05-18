
import { DetailType } from "../models/DetailTypes";
import { Detail } from "../models/Details";
const { Op } = require("sequelize");

//muestra todos de la tabla detail
export const getDetail = async (req, res) => {
  try {
    const detail = await Detail.findAll({ include: DetailType });
    res.json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//muestra por id de la tabla detail
export const getDetailById = async (req, res) => {
  const { id } = req.params;

  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }

  try {
    const detail = await Detail.findOne({
      where: {
        id,
      },
    });
    if (!detail) {
      return res.status(404).json({ message: "Detail does not exists" });
    }

    res.send(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//crear un nuevo registro en la tabla Detail
export const createNewDetail = async (req, res) => {
  const { detailTypeId, name, amount, amountOfMoney, description, date } =
    req.body;

  if (
    detailTypeId == null ||
    name == null ||
    amount == null ||
    amountOfMoney == null 
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }


  try {
    await Detail.create({
      detailTypeId,
      name,
      amount,
      amountOfMoney,
      description,
      date: date,
    });

    res.send("creating Detail");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//actualizar un registro en la tabla Detail
export const updateDetail = async (req, res) => {
  const { detailTypeId, name, amount, amountOfMoney, description, date } =
    req.body;

  const { id } = req.params;
  if (
    detailTypeId == null ||
    name == null ||
    amount == null ||
    amountOfMoney == null 
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    const detail = await Detail.findByPk(id);
    detail.detailTypeId = detailTypeId;
    detail.name = name;
    detail.amount = amount;
    detail.amountOfMoney = amountOfMoney;
    detail.description = description;
    detail.date = date
    await detail.save();

    res.json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//eliminar un registro en la tabla Detail
export const deleteDetail = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }
  try {
    await Detail.destroy({
      where: {
        id,
      },
    });
    res.send("confirmed request: item was removed");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//buscar por name registro en la tabla Detail
export const searchDetail = async (req, res) => {
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
    const detail = await Detail.findAndCountAll({
      where: {
        name: {
          [Op.like]: "%" + search + "%",
        },
      },
    });
    if (detail.count === 0) {
      return res.status(400).json({ msg: "Not found!" });
    } else {
      res.send(detail.rows);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

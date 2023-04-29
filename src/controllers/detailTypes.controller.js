import { DetailType } from "../models/DetailTypes.js";

export const getDetailType = async (req, res) => {
  try {
    const detailTypes = await DetailType.findAll();
    res.json(detailTypes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDetailTypeById = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }
  try {
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
  const { nameNumber, name, tags, date } = req.body;

  if (nameNumber == null || name == null || tags == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  var date_time = new Date();

  try {
    const newDetailType = await DetailType.create({
      nameNumber,
      name,
      tags,
      date: date_time,
    });

    res.send("creating DetailType");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDetailType = async (req, res) => {
  const { nameNumber, name, tags } = req.body;
  const { id } = req.params;
  if (nameNumber == null || name == null || tags == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    const detailType = await DetailType.findByPk(id);
    detailType.nameNumber = nameNumber;
    detailType.name = name;
    detailType.tags = tags;
    await detailType.save();
    res.json(detailType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDetailType = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }
  try {
    await DetailType.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

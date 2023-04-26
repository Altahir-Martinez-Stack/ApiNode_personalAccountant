import { getConnection, sql, queries } from "../database";

export const getDetailType = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getDetailType);
    res.json(result.recordsets);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDetailTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == null) {
      return res.status(400).json({ msg: "Id es nulo" });
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.getDetailTypeById);

    res.send(result.recordsets[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDetailTypeByDetailId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == null) {
      return res.status(400).json({ msg: "Id es nulo" });
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.getDetailTypeByDetailId);

    res.send(result.recordsets[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewDetailType = async (req, res) => {
  const { nameNumber, name, tags, date } = req.body;

  if (nameNumber == null || name == null || tags == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  var date_time = new Date();

  const pool = await getConnection();

  try {
    await pool
      .request()
      .input("nameNumber", sql.Int, nameNumber)
      .input("name", sql.VarChar, name)
      .input("tags", sql.VarChar, tags)
      .input("date", sql.DateTime, date_time)
      .query(queries.addNewDetailType);

    res.json({ detailId, name, tags, date });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateDetailTypeById = async (req, res) => {
  try {
    const { nameNumber, name, tags } = req.body;
    const { id } = req.params;
    if (detailId == null || name == null || tags == null) {
      return res
        .status(400)
        .json({ msg: "Bad Request. Please Fill all fields" });
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nameNumber", sql.Int, nameNumber)
      .input("name", sql.VarChar, name)
      .input("tags", sql.VarChar, tags)
      .input("id", sql.Int, id)
      .query(queries.updateDetailTypeById);

    res.json({ detailId, name, tags });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteDetailTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == null) {
      return res.status(400).json({ msg: "Id es nulo" });
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.deleteDetailById);

    res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

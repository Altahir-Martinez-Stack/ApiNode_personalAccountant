import { getConnection, sql, queries } from "../database";

export const getDetail = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getDetail);
    res.json(result.recordsets[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewDetail = async (req, res) => {
  const { detailTypeId, name, amount, amountOfMoney, description, date } =
    req.body;

  if (
    detailTypeId == null ||
    name == null ||
    amount == null ||
    amountOfMoney == null ||
    description == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  var date_time = new Date();

  const pool = await getConnection();

  try {
    await pool
      .request()
      .input("detailTypeId", sql.Int, detailTypeId)
      .input("name", sql.VarChar, name)
      .input("amount", sql.Int, amount)
      .input("amountOfMoney", sql.Decimal, amountOfMoney)
      .input("description", sql.Text, description)
      .input("date", sql.DateTime, date_time)
      .query(queries.addNewDetail);

    res.json({ detailTypeId, name, amount, amountOfMoney, description, date });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == null) {
      return res.status(400).json({ msg: "Id es nulo" });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.getDetailById);

    res.send(result.recordsets[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteDetailById = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }
  try {
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

export const updateDetailById = async (req, res) => {
  const { detailTypeId, name, amount, amountOfMoney, description, date } =
    req.body;

  const { id } = req.params;
  if (
    detailTypeId == null ||
    name == null ||
    amount == null ||
    amountOfMoney == null ||
    description == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("detailTypeId", sql.Int, detailTypeId)
      .input("name", sql.VarChar, name)
      .input("amount", sql.Int, amount)
      .input("amountOfMoney", sql.Decimal, amountOfMoney)
      .input("description", sql.Text, description)
      //.input("date", sql.DateTime, date)
      .input("id", sql.Int, id)
      .query(queries.updateDetailById);

    res.json({ detailTypeId, name, amount, amountOfMoney, description, date });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const searchDetail = async (req, res) => {
  const { search } = req.body;

  if (search == null) {
    return res.status(400).json({ msg: "Bad Request. Can not do the search" });
  }
  //Validate Number
  var num = 5;
  if (search.length == num) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Only " + num + " letters are allowed" });
  }

  var searchExtensive = "%" + search + "%";
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("search", searchExtensive)
      .query(queries.searchDetail);

    res.json(result.recordsets[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//beta aun en prueba
async function validateIdDetail(id) {
  var result = false;

  const pool = await getConnection();
  const resultSql = await pool
    .request()
    .input("id", sql.Int, id)
    .query(queries.validatingDetailById);
  //console.log("result:", resultSql.recordset[0].Result);
  if (resultSql.recordset[0].Result === true) {
    result = true;
  }

  return result;
}

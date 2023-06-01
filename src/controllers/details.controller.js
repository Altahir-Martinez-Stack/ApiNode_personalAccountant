import { DetailType } from "../models/DetailTypes";
import { Detail } from "../models/Details";
import sequelize from 'sequelize'
// functions helps
async function updated(detail) {
  try {
    const foundDetail = await Detail.findByPk(detail.id)

    if (foundDetail) {
      foundDetail.detailTypeId = detail.detailTypeId
      foundDetail.name = detail.name
      foundDetail.amount = detail.amount
      foundDetail.amountOfMoney = detail.amountOfMoney
      foundDetail.description = detail.description
      foundDetail.date = detail.date
      await foundDetail.save()
      return { status: true, data: foundDetail.dataValues }
    }
  } catch (error) {
    return { status: false, error: error.message }
  }
}

async function created(detail) {
  try {
    const newDetail = await Detail.create({
      detailTypeId: detail.detailTypeId,
      name: detail.name,
      amount: detail.amount,
      amountOfMoney: detail.amountOfMoney,
      description: detail.description,
      date: detail.date,
    });
    return { status: true, data: newDetail.dataValues }
  } catch (error) {
    return { status: false, error: error.message }
  }
}

//muestra todos de la tabla detail
export const getDetail = async (req, res) => {
  try {
    const detail = await Detail.findAll({
      include: DetailType, // muestra un nueva propiedad "detailType" extendiendo la tabla detailtypes
      order: [["date", "DESC"]], // muestra en orden a la fecha de forma descente
    });
    res.json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//muestra por id de la tabla detail
export const getDetailById = async (req, res) => {
  //Datos que se envias desde el front
  const { id } = req.params;

  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }

  try {
    //hace la busqueda por el id
    const detail = await Detail.findOne({
      where: {
        id,
      },
    });
    //Valida si existe el id
    if (!detail) {
      return res.status(404).json({ message: "Detail does not exists" });
    }

    res.send(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//creat varios registro en la tabla Detail
export const createNewDetails = async (req, res) => {
  const details = req.body
  if (!details ||
    !Array.isArray(details) ||
    details?.length <= 0 ||
    !details[0]?.name
  ) {
    res.status(400).json({ msj: "Bad Request. fill in the details" })
  }


  try {
    const newDetails = []
    for (let detail of details) {
      if (
        !detail.detailTypeId ||
        !detail.name ||
        detail.amount == null ||
        !detail.amountOfMoney
      )
        return res.status(400).json({ msg: "Bad Request. Please Fill all fields", detail })

      // validate for update Detail
      if (id) {
        const foundDetail = await updated(detail);
        if (foundDetail.status) newDetails.push({ status: "updated", ...foundDetail.data })

      } else { //created detail
        const newDetail = await created(detail);
        if (newDetail.status) newDetails.push({ status: "created", ...newDetail.data })
      }
    }

    Promise.all(newDetails).then(result => res.json(result))
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//crear un nuevo registro en la tabla Detail
export const createNewDetail = async (req, res) => {
  //Datos que se envias desde el front
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
  const detail = req.body;
  //Datos que se envias desde el front
  const { detailTypeId, name, amount, amountOfMoney } = detail


  const { id } = req.params;

  //Valida es null o no
  if (
    detailTypeId == null ||
    name == null ||
    amount == null ||
    amountOfMoney == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    //hace una busqueda con el id en la tabla DetailType
    const validateDetail = await Detail.findOne({
      where: {
        id,
      },
    });

    //Valida si existe el id
    if (!validateDetail) {
      return res
        .status(400)
        .json({ msg: "Bad Request. That element was not found" });
    }

    const foundDetail = await updated(detail);
    if (foundDetail.status)
      res.json({ ...foundDetail.data })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//eliminar un registro en la tabla Detail
export const deleteDetail = async (req, res) => {
  //Datos que se envias desde el front
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({ msg: "Id es nulo" });
  }
  try {
    const validateDetail = await Detail.findOne({
      where: {
        id,
      },
    })

    //Valida si existe el id
    if (!validateDetail) {
      return res
        .status(400)
        .json({ msg: "Bad Request. That element was not found" });
    }

    //Elimina
    await Detail.destroy({
      where: {
        id,
      },
    })

    res.send("confirmed request: item was removed");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//buscar por name registro en la tabla Detail
export const searchDetail = async (req, res) => {
  //Datos que se envias desde el front
  const { search } = req.body;

  //valite empty or not string
  if (!search || typeof search !== 'string') {
    return res.status(400).json({ msg: "Bad Request. Can not do the search" });
  }
  //Validate min search number 
  var num = 3;
  if (search.length < num) {
    return res
      .status(400)
      .json({ message: "Bad Request. Only " + num + " letters are allowed" });
  }

  try {
    const { Op, where, fn, col } = sequelize
    const whereCaseInsensitive = (column) =>
      where(fn('LOWER', col(`${column}`)), 'LIKE', '%' + search + '%')

    //Hace la busqueda de la tabla Detail por el nombre y description
    const detail = await Detail.findAndCountAll({
      order: [["date", "DESC"]], //order descendente
      where: {
        [Op.or]: [
          { name: whereCaseInsensitive('name') },
          { description: whereCaseInsensitive('description') }
        ]
      },
    })

    if (detail.count === 0)
      res.status(400).json({ msg: "Not found!" })
    else
      res.send(detail.rows)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

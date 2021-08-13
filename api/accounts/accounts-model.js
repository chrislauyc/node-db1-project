const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db.select("*").from("accounts"); //array of records
}

const getById = id => {
  // DO YOUR MAGIC
  return db.select("*")
  .from("accounts")
  .where({id:id})
  .first(); //a record
}
const getByName=name=>{
  return db("accounts")
  .where({name})
  .first(); //a record
}
const create = account => {
  // DO YOUR MAGIC
  return db("accounts")
  .insert(account); //array of ids
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db("accounts")
  .where({id:id})
  .update(account); //number of records updated
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db("accounts")
  .where({id:id})
  .delete(); //number of records deleted
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}

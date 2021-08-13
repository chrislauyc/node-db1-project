const router = require('express').Router()
const { checkAccountId,checkAccountNameUnique,checkAccountPayload } = require('./accounts-middleware');
const accModel = require("./accounts-model");

router.get('/', async(req, res, next) => {
  // DO YOUR MAGIC
  const accounts = await accModel.getAll();
  res.status(200).json(accounts);
})

router.get('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.status(200).json(req.account);
  }
  catch(err){
    next(err);
  }
})

router.post('/',checkAccountPayload,checkAccountNameUnique, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {name,budget} = req.body;
    const newAccount = await accModel.create({name,budget});
    if(newAccount){
      res.status(201).json(newAccount);
    }
    else{
      next({message:"unable to create"});
    }
  }
  catch(err){
    next(err);
  }
})

router.put('/:id',checkAccountId,checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {name,budget} = req.body;
    const counts = await accModel.updateById(req.params.id,{name,budget});
    if(counts !== 0){
      res.status(200).json({id,name,budget});
    }
    else{
      next({message:"cannot update account"});
    }
  }
  catch(err){
    next(err);
  }
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const counts = await accModel.deleteById(req.params.id);
    if(counts !== 0){
      res.status(200).json({"records deleted":counts});
    }
    else{
      next({message:"cannot delete record"});
    }
  }
  catch(err){
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json(err);
})

module.exports = router;

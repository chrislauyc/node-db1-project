const router = require('express').Router()
const { checkAccountId,checkAccountNameUnique,checkAccountPayload } = require('./accounts-middleware');
const accModel = require("./accounts-model");

router.get('/', async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await accModel.getAll();
    res.status(200).json(accounts);
  }
  catch(err){
    // console.log("why no message?")
    // next(new Error("catch for no reason"))
    next(err);
  }
})

router.get('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  console.log("get id")
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
    const ids = await accModel.create({name,budget});
    if(ids.length !== 0){
      res.status(201).json({name,budget});
    }
    else{
      next(new Error("unable to create"));
    }
  }
  catch(err){
    next(err);
  }
})

router.put('/:id',checkAccountId,checkAccountPayload, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {name,budget} = req.body;
    const counts = await accModel.updateById(req.params.id,{name,budget});
    if(counts !== 0){
      res.status(200).json({id:req.body.id,name,budget});
    }
    else{
      next(new Error("cannot update account"));
    }
  }
  catch(err){
    next(err);
  }
});

router.delete('/:id',checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const counts = await accModel.deleteById(req.params.id);
    if(counts !== 0){
      res.status(200).json({"records deleted":counts});
    }
    else{
      next(new Error("cannot delete record"));
    }
  }
  catch(err){
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({message:err.toString()});
})

module.exports = router;

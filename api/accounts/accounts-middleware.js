const accModel = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name,budget} = req.body;
  if(name&&budget){
    next()
  }
  else{
    res.status(400).json({message:"please include name and budget"});
  }
}

exports.checkAccountNameUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {name} = req.body;
    const account = await accModel.getByName(name);
    if(account){
      res.status(403).json({message:"account name is already taken"});
    }
    else{
      next();
    }
  }
  catch(err){
    next(err);
  }
}

exports.checkAccountId = async(req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  const account = await accModel.getById(id);
  if(account){
    req.account = account;
    next();
  }
  else{
    res.status(404).json({message:"id not found"});
  }
}

const accModel = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  try{

    // DO YOUR MAGIC
    let {name,budget} = req.body;
    if(name===undefined||budget===undefined){
      res.status(400).json({message:"name and budget are required"});
      // res.status(400).json({message:`${name} ${budget}`});
      return;
    }
    if(typeof(name)!=="string"){
      res.status(400).json({ message: "name of account must be a string" });
      return;
    }
    if(typeof(budget)!=="number" || isNaN(Number(budget))){
      res.status(400).json({ message: "budget of account must be a number" });
      return;
    }
    if(budget<0 || budget>1000000){
      res.status(400).json({ message: "budget of account is too large or too small" });
      return;
    }
    req.body.name = name.trim();
    if(req.body.name.length<3||req.body.name.length>100){
      // console.log("name length",req.body)
      res.status(400).json({ message: "name of account must be between 3 and 100" });
      return;
    }
    // res.status(400).json({message:`${req.body.name} ${req.body.budget} ${typeof(req.body.budget)}`})
    next();
  }
  catch(err){
    next(err);
  }
}

exports.checkAccountNameUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const {name} = req.body;
    const account = await accModel.getByName(name);
    if(account){
      res.status(400).json({message:"name is taken"});
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
  try{
    const {id} = req.params;
    const account = await accModel.getById(id);
    if(account){
      req.account = account;
      next();
    }
    else{
      res.status(404).json({message:"account not found"});
    }
  }
  catch(err){
    next(err);
  }
}

const express = require("express");
const accRoute = require("./accounts/accounts-router");
const server = express();
server.use(express.json());
server.use("/api/accounts",accRoute);
server.use("/",(req,res)=>res.status(200).json({message:"welcome! server is ready"}));
module.exports = server;

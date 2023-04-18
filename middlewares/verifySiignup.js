
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../configSecret');
const Usuario = require('../models/usuario');


const verifyToken= async (req= request, res,  next)=>{

    const token= req.headers["x-access-token"];

    console.log(object);
    if(!token) return res.status(403).json({message:"Token invalido"});

    const decode= jwt.verify(token, config.SECRET);
    req.usuarioId= decode.id;
    
    const usuario= await Usuario.findById(req.usuarioId, {password:0});
    if(!usuario) return res.status(404).json({message: 'usuario no encontrado'});
    console.log(decode);



    next();

}

module.exports={verifyToken };
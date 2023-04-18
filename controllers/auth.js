const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Role= require('../models/Role')


const{secret}= require('../configSecret');// importacion de la funcion que se encuentra en el archivo configSecret

//metodo para registrar el usuario
const signup= async (req= request  , res =response)=>{
  
  try{
  const {nombre, apellido, username, email, password, roles}= req.body

  const usuario  = new Usuario({
    nombre,
    apellido,
    username, 
    email,
    password: await Usuario.encryptPassword(password)
  })
  
  //verificacion de roles   
  if (roles){
    const  foundRoles= await Role.find({nombre: {$in: roles}});
    usuario.roles=foundRoles.map((role)=>role._id);
  }else{
    const role= await Role.findOne({nombre:"user"});
    usuario.roles=[role._id];
  }

   const saveUsuario=  await usuario.save(); // se guarda el usuario en la bd con la password cifrada en

  // se metodo para generar el token  del usuario y tambien se guarda - se debe importat el metodo secret.SECRET del archvo configSecret
  const token=    jwt.sign({id:  saveUsuario._id }, secret.SECRET , {
    expiresIn: 86400 // esto es para expiracion del toquen de jwt 24 horas
  });
   console.log(saveUsuario) //verificar como se devolveria el objeto y el token completo 

  return  res.status(200).json({token});
  }catch(e){
      return res.status(500).json({error: e});
  }
};

const signin= async (req= request  , res =response)=>{
  
  try{
    const foundUsuario= await Usuario.findOne({email: req.body.email}).populate("roles"); // se  busca en la base de datos por email y se pobla los roles 
    if(!foundUsuario) return res.status(400).json({message:"Usuario no existe"});// si lo que viene por body es diferente se envia este mensaje 

    const passwordMatch=   await Usuario.comparePassword(req.body.password,  foundUsuario.password); // comparacion de password que se ingresann

    if(!passwordMatch) return res.status(401).json({token: null, message: "password errada"}); // hace la comparacion de la pasword que ingresa el usuario con la de la BD

    console.log(foundUsuario);

  const toke =jwt.sign({id: foundUsuario._id }, secret.SECRET, {
          expiresIn: 86400
        })

    res.json({token: toke});
  
  
  }catch(e){
      return res.status(500).json({error: e});

  }
};


module.exports={signup, signin };


//TODO: falta la proteccion de las rutas  1:40 https://www.youtube.com/watch?v=lV7mxivGX_I&t=1992s
const { request, response } = require('express');

//const Usuario = require('../models/usuario');
const Role = require('../models/Role');


const createRoles= async (req= request  , res =response)=>{

    try{
    //se hace el conteo de los roles en la base de datos 
    const count=   await Role.estimatedDocumentCount();
    
    if(count>0) return;
//ejecuta todas las promesas a ala vez 
const values= await Promise.all([
        new Role({nombre: 'user'}).save(),
        new Role({nombre: 'admin'}).save()
    ]);
    console.log(values)

    }catch(error){
        console.error(error)
    }
}

module.exports= {createRoles}
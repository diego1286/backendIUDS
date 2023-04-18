const mongoose= require('mongoose');  
const{Schema, model}= require('mongoose');// se importa el mongosse de la libreria instalada junto con el modelo

// manera de crear los modelos o schemas en mongosse 
const RolesSchema =Schema({
 nombre: String 
},{
    versionKey:false
 });


module.exports = model('Role',RolesSchema );// se llama en la logica de negocio Usuario con el schema esto es en el service


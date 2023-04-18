const {Schema, model}=require('mongoose');
const Feed = require('../models/feeds');


const DataSchema= Schema({

   data:JSON

/*
//TODO: verificar como guardar la estructura de la bd desde
//TODO: verificar como se hace las peticiones por consultas de los datos que se requieren 



    latitud:{
        type: Number,
        required:true
    },
    longuitud:{
        type: Number,
        required:true
    },
    porcentaje :{
        type: Number,
        required:true
    }, 
    elevacion:{
        type: Number,
        required:true
    },
    fechaGuardado:{
        type: Date,
        default: new Date()
    },
    potencia:{
        type: Number,
        required:true
    }
    // se hace  esta relacion con usuario para cuando el usuario este logueado pueda hcer las peticiones
    // que haga el mismo 
    */
});

module.exports= model('Data',DataSchema)
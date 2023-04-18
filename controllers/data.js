
const { request, response }=  require('express');
const Data = require('../models/data');

const cron = require('node-cron');

const axios = require('axios');
const { Model } = require('mongoose');

/* metodo para crear data,  req= request  , res =response
como no se envian por colbac hay q decirle q es el req y response por eso se igualan
e importan, tambien hay q mandarle por body lo q se quiere crear al metodo
es por eso que se crea un objeto data y se intancia pasandole el body
luego se le envia por json el body q es lo que captura  del front */


cron.schedule('*/1 * * * *', () => {
    console.log('este es el minuto');
  
  axios.get('https://api.thingspeak.com/channels/1810697/feeds.json?api_key=BKUEK569AOLSNUU6&results=2')
  .then(r=>{
    console.log(r.data)
    createData(r.data)
  })

});

const createData= async (req )=>{
    try{
    const datass = new Data({data:req}); 
       console.log(datass)
      await datass.save();
      //  res.status(201).json(datass);
        //const models= datass.save(req)
        //console.log(models)
        // let voltaje = xy *340(formula )
        // TODO: crear metodo que me guarde en una nueva tabla los campos fields1 y 2 

    }catch(e){
        //return res.status(500).json({
            //error: e
            console.log(e)
       // });
    }
    //retorne 
};

/* obtener todos los los datos  del programa ya los muesta*/ 
const getUData = async (req,  res= response)=>{
    try{
        const query ={};
        const data = await Data.find(query);
        console.log(data)
        res.json(data)
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error: e
        }).send({message: e.message})
    }
}

/*actualizar un usuario por id*/
const updateDataById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { username, ...data } = req.body;// destructuring, spread (...)
    
        const datass = await Data.findOne({ _id: id });
    
        if(!datass){
            return res.status(404).json({
                msj: 'No existe data'
            });
        }
        data.localizacion = datass.localizacion;
        const dat = await Data.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(dat);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


/* eliminar usuario*/

const deleteDataByID = async (req = request, res = response) => {
    try{
        const id = req.params.id;
    const data = await Data.findByIdAndDelete(id);
    res.status(204).json(data);
    } catch(e){
        return res.status(500).json({msg: e})
    }
    
}


module.exports= {createData, getUData, updateDataById, deleteDataByID }

// TODO: preguntar que son fiels del vector por que no se que sera esat el back para iniciar el front  
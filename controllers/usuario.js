
const { request, response }=  require('express');
const Usuario = require('../models/usuario');

/* metodo para crear usuarios,  req= request  , res =response
como no se envian por colbac hay q decirle q es el req y response por eso se igualan
e importan, tambien hay q mandarle por body lo q se quiere crear al metodo
es por eso que se crea un objeto usuario y se intancia pasandole el body
luego se le envia por json el body q es lo que captura  del front */
const createUsuarios= async (req= request  , res =response)=>{
    // se manejan los errores no de obligatoriedad para conocer los errores 
    // que se cometen al guardar lo objetos de la bd
    try{
    const body = req.body;
    const usuario = new Usuario(body);
    // devuelve una promesa desde la bd por eso se le pasa el await y el async de la creacion del metodo
    await usuario.save();
    console.log(body);
    res.json(usuario);
    }catch(e){
        return res.status(500).json({error: e});
    }
};
/* obtener todos los suarios del programa*/ 
const getUsuarios = async (req,  res= response)=>{
    try{
        const query ={};// se soluciona el error 500 es con find para traer todos los usuarios tenias fiandAll no te traia 
        // pero sin embargo se debe averiguar como se hace el query para traer un solo dato especifico como el nombre u otro 
        const usuarios = await Usuario.find(query);
        res.json(usuarios)
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error: e
        })
    }
}

/*actualizar un usuario por id*/
const updateUsuarioById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { username, ...data } = req.body;// destructuring, spread (...)
        const usuario = await Usuario.findOne({ _id: id });
        if(!usuario){
            return res.status(404).json({
                msj: 'No existe usuario'
            });
        }
        data.username = usuario.username;
        const user = await Usuario.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(user);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


/* eliminar usuario*/

const deleteUsuarioByID = async (req = request, res = response) => {
    try{
        const id = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(id);
    res.status(204).json(usuario);
    } catch(e){
        return res.status(500).json({msg: e})
    }
    
}


module.exports= {createUsuarios, getUsuarios, updateUsuarioById, deleteUsuarioByID }

const { Router}= require('express');

const router = Router();

const {getUsuarios, createUsuarios, updateUsuarioById, deleteUsuarioByID}=  require('../controllers/usuario');// se trae el usuariocontroller es la manera deimportar los aarchivos en js


// Obtiene todos los usuarios 
router.get('/obtener', getUsuarios);

// crear usuarios 
router.post('/create', createUsuarios);

// actualiza por id el usuario con el verbo put
router.put('/:id', updateUsuarioById);

// Elimina usuario por id
router.delete('/:id', deleteUsuarioByID);


module.exports = router;

/*
en este archivo se realizan las rutas del crude por el momento solo se creara la 
principal y la de  crear un usuario 
*/

/* 
{
    "nombre":"diego",
    "apellido":"sanchez",
    "username":"das",
    "email":"d@gmail.com",
    "password":"122344555",
    "estado": true
}
*/


const { Router}= require('express');

const router = Router();

const {createData, getUData, updateDataById, deleteDataByID } = require('../controllers/data')


// Obtiene todos los datos
router.get('/',  getUData);

// crea una data 
router.post('/create', createData);


// actualiza por id el data
router.put('/:id', updateDataById);


// Elimina una data  por id
router.delete('/:id', deleteDataByID);



// Obtiene la ubicacion por id por id 
router.get('/:id', );


// actualiza una parte de la data el patch es el verbo para editar un usuario como nombre
router.patch('/:id', );



module.exports = router;

/*
en este archivo se realizan las rutas del crude por el momento solo se creara la 
principal y la de  crear una data  
*/

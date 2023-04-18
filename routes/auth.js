const { Router}= require('express');

const router = Router();

const {signup, signin } = require('../controllers/auth')// debe traer los metodos del controoler auth


// ruta del loal host la prtomera que ve el usuario
router.get('/',  (req, res)=>{
    console.log(req.body); //se envian por consola los datos esto se borra finalizando la app 
    return res.json({})
});



// ruta para recibir los datos que se envian mediante el formulario
router.post('/signup', signup);



// ruta para escuchar  los datos de la ruta get(signin) y validacion de datos 
router.post('/signin', signin);


module.exports= router;
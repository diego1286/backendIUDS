const dotenv = require('dotenv').config(); // se imporantan las librerias para utilizar las conexiones
const app = require('./app'); // se importa el modulo app que es el main de la aplicacion 
const {mongoConn} = require('./databases/configuration');// se importa la coenxion de la bd desde el modulo config
//const sessions= require('express-session'); // sirve para manejar las sesiones de la aplicacion no login 
const passport= require('passport');

// se asigna puerto 5000 para que corra la aplicacion se declara la variable
app.set('port', process.env.PORT  || 5000);

const conn = mongoConn(); // intancia de la conexion a la bd conn es la variable q se importa 

// se escucha en el puerto e imporime por consola  se obtiene la variable creada en el puerto
app.listen(app.get('port'), ()=>{
    console.log(`corre Forest puerto: ${app.get('port')}`)
});
/*
app.use(sessions({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
*/


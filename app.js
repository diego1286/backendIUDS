//archivo main de la aplicacion 

const express= require('express'); // se importa express para poder correr el proyecto
const cors= require('cors');// establece los protocolos de conexion dentro de la aplicacion 
const morgan= require('morgan');


const {createRoles} = require('./libs/initialRoles')// una vez inicia la aplicacion se trae el archivo initialroles


// Inicializacion de la aplicacion 
const app =express();// se establece la conexion con exprress inica el servidor
createRoles();


/* se deben traer a app los archivos que se requiere para que corra  el servicio lo que llamaria clases que se utilizaran
En este caso serian las rutas que generan los empoint*/
const usuarios= require('./routes/usuario');
const data= require('./routes/data');
const auth= require('./routes/auth');


/*middlewares se colocan antes  de los empoint son para capturar los datos
 que se le pasan por body en algunos casos estudiar para que sirven y sus funcionalidades */

app.use(express.urlencoded({extended: false})); // establece la lectura de las rutas para que el cleinte la lea

app.use(express.json());// permite leer archivos en formato json
app.use(cors());
app.use(morgan('dev'));



/*se establecen los enpoint para llamar las rutas de la aplicacion*/
app.use('/api/usuarios', usuarios); // empoints 
app.use('/api/datas', data);// empoint de datas 
app.use('/api/auths', auth); //empoint de autenticacion




module.exports= app;
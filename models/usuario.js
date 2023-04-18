// se cre el schema de mongo esto traduce a tablas 
const mongoose= require('mongoose');
const bcrypt = require('bcrypt'); //se requiere el modulo para  cifrar  
const{Schema, model}= require('mongoose');// se importa el mongosse de la libreria instalada junto con el modelo

// manera de crear los modelos o schemas en mongosse 
const UsuariosSchema =Schema({
    nombre: {
        type: String,
        required:[true, 'Campo obligatorio']
    },
    apellido:{
        type: String,
        required:[true, 'Campo obligatorio'],
    },
    username:{
        type: String,
        required:[true, 'Campo obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required:[true, 'Campo obligatorio'],
    },
    password:{
        type: String,
        required:[true, 'Campo obligatorio'],
    }, 
    roles: [{ 
        ref:"Role", // esto hace la referencia con el schema construido en role 
        type: Schema.Types.ObjectId // relacion con la tabala role y esta es la relacion en mongo desde su id 
    }]
},
{ 
    timestamps:true,
    versionKey:false
}

);

// se debe realcionar con roles en mongo 
UsuariosSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);// gensalt metodo de bycryt para cifrar la password 
    return await bcrypt.hash(password, salt); // se crea un has de la password actual y la constante creada salt 
  };// metodo que cifra la password rcibe una para retornarla cifrada
  
  UsuariosSchema.statics.comparePassword= async (password, receivedPassword)=> {
    return await bcrypt.compare(password, receivedPassword);// compara la pass de manera asincrona devolviendo un true o false segun el caso 
  };// metodo para validar la password cifrada en la bd y compararla se ejecuta con una funcion

module.exports = model('Usuario',UsuariosSchema );// se llama en la logica de negocio Usuario con el schema esto es en el service




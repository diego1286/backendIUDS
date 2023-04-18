
const mongoose= require ('mongoose'); //permite la conexion con mongo y la bd es una libreria 

const mongoConn = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI, {
            useNewurlParser:true,
            useUnifiedTopology:true
        });
        console.log('Le pegaste donde era Forest');
    }catch(e){
        console.log('No conecto esfuerzate', e);
        throw new Error('Error de conexion nada')
    }
};

module.exports={mongoConn}; // se exporta el modulo de conexion 
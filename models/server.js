const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //conectar a BD
        this.conectarDB();

        // Middlewares - Funcion que ejecuta cuando se levante el servidor(se ejecuta antes de ejecutar un controlador o peticiones)
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        // directorio publico
        this.app.use( express.static('public') );
        //CORS - Sirve para restringir/proteger el servidor
        this.app.use( cors() );

        // lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
       
      this.app.use(this.usuariosPath , require('../routes/user'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }

}

module.exports = Server;
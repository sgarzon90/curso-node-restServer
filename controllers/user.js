const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const Usuario = require('../models/usuario.js');

const userGet = async(req, res = response) => {

    //const {q, nombre = 'no name', apikey} = req.query;
     const {limite = 5, desde = 0} = req.query;
     const query = {estado: true};

     // const usuarios = await Usuario.find(query)
     //      .skip(Number(desde))
     //      .limit(Number(limite))
     // const total = await Usuario.countDocuments(query);     

     // promise: mandar un arreglo con todas las promesos que quiero que se ejecuten

     const [total, usuarios] = await Promise.all([
          
          Usuario.countDocuments(query),
          Usuario.find(query)
          .skip(Number(desde))
          .limit(Number(limite))

     ])

    res.json({
          total,
        usuarios
     //resp
    });
}

const userPut = async (req, res = response) => {

        const {id} = req.params;

        const {_id,password, google, correo,...resto  } = req.body;

        //validar que el usuario si exista
        if (password) {
          //encriptar contraseña
          // hacer hash de la contraseña
          // salt = numero de vueltas que se deben hacer para desencripar, si es mas vueltas es mas seguro
          const salt = bcryptjs.genSaltSync();
          resto.password = bcryptjs.hashSync( password, salt);

        }

        const usuariodb = await Usuario.findByIdAndUpdate(id, resto);
    
        res.json(usuariodb); 
}

const userPost =  async(req, res = response) => { 

        
        const {nombre, correo, password, rol} = req.body;
        const usuario = new Usuario( {nombre, correo, password, rol} );
        
        
        // hacer hash de la contraseña
          // salt = numero de vueltas que se deben hacer para desencripar, si es mas vueltas es mas seguro
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt);

        //guardar en BD
        await usuario.save();

        res.json({
        usuario
    });
}


const userPatch = (req, res = response) => { 
       
   
        res.json({
             msg: 'patch API - controlador'
        });
}

const userDelete = async(req, res = response) => { 
       
   const { id } = req.params;

     // borrar fisicamente

     //const usuario = await Usuario.findByIdAndDelete( id );

     const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});


    res.json({
        usuario
   });
}


  module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
  }
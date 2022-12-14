const Role = require('../models/rol');
const Usuario = require('../models/usuario.js');

const validarRole = async (rol = '') => {
    const existeRol = await Role.findOne( { rol });  
    if(!existeRol){
      throw new Error(`El rol ${rol} no está registrado en la base de datos `)
    }
  }
  
  
const emailExiste = async ( correo = '') => {
  // verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
        if ( existeEmail ) {
            throw new Error(`El correo ${correo} ya está registrado `);
          
        }
}

const idUsuarioExiste = async ( id ) => {
  // verificar si el correo existe
  const existeUsuario = await Usuario.findById( id );
        if ( !existeUsuario ) {
            throw new Error(`El ID ${id} no existe `);
          
        }
}

  module.exports = {
    validarRole,
    emailExiste,
    idUsuarioExiste
  }

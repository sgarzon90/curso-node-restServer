const { response } = require('express');

const userGet = (req, res = response) => {

    const {q, nombre = 'no name', apikey} = req.query;

    res.json({
         msg: 'GET API - Controlador',
         q,
         nombre,
         apikey
    });
}

const userPut = (req, res = response) => {

        const {id} = req.params;
    
        res.json({
             msg: 'put API - Controlador',
             id
        }); 
}

const userPost = (req, res = response) => { 
       

        const {nombre, edad} = req.body;


        res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}


const userPatch = (req, res = response) => { 
       
   
        res.json({
             msg: 'patch API - controlador'
        });
}

const userDelete = (req, res = response) => { 
       
   
    res.json({
        msg: 'delete API - Controlador'
   });
}


  module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
  }
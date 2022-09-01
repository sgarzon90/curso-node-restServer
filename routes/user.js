const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarRole, emailExiste, idUsuarioExiste } = require('../helpers/db-validators');
const { userGet, userPut, userPost, userPatch, userDelete } = require('../controllers/user');


const router = Router();

  router.get('/', userGet );

  router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('rol').custom( validarRole ),
    validarCampos
  ], userPut);

  router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de tener más de 6 letras').isLength({min:6}),
    //check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom( emailExiste ),
    check('rol').custom( validarRole ),
    validarCampos
  ],userPost);

  router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    validarCampos
  ], userDelete);

  router.patch('/', userPatch);

module.exports = router;
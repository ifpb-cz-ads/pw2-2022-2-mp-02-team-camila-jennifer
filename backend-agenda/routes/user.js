// Definição dos esquemas a serem usados pela documentação Swagger.
/**
 * @swagger
 * components:
 *   schemas:
 *     NovoUsuario:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nome do usuario.
 *           example: Camila Jennifer
 *         email:
 *           type: string
 *           description: Email do usuario.
 *           example: camila.jennifer@gmail.com
 *         password:
 *           type: string
 *           description: Senha do usuario.
 *           example: xdfh648ffvn
 *     Usuario:
 *       allOf:
 *         - $ref: '#/components/schemas/NovoUsuario'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID do usuario.
 *               example: 0
 *             createdAt:
 *               type: string
 *               description: Data no formato ISO em que o usuario foi registrado.
 *               example: 2021-07-08T18:08:19.965Z
 *             updatedAt:
 *               type: string
 *               description: >
 *                 Data no formato ISO em que o usuario foi atualizado pela última vez.
 *               example: 2021-07-08T18:08:19.965Z
 *             code:
 *               type: integer
 *               description: Código de validação enviado para o email do usuário
 *               example: 123456
 *
 */
const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');

// Importa o controller
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Cria um novo usuario.
 *     description: Cadastra usuários.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       201:
 *         description: Usuario criado
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: E-mail já cadastrado.
*/
router.post('/register', userController.userCreate);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuario.
 *     description: Realiza login do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                properties:
 *                 email:
 *                   type: string
 *                   example: camila.jennifer@gmail.com
 *                 password:
 *                   type: string
 *                   example: dfh648ffvn
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY2ODgxMDcwN30.BsgKZtu6ghzrf6P4r98NspDFo
 *       200:
 *          description: Valide seu email
 *       400:
 *         description: E-mail ou senha inválidos.
*/
router.post('/login', userController.userLogin);

/**
 * @swagger
 * /users/validation:
 *   put:
 *     summary: Validação do Usuário.
 *     description: Realiza a validação do email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                properties:
 *                 email:
 *                   type: string
 *                   example: camila.jennifer@gmail.com
 *                 validatecode:
 *                   type: integer
 *                   example: 123456
 *     responses:
 *       201:
 *         description: Validação realizada com sucesso
 *       200:
 *         description: Email já verificado
 *       400:
 *         description: Código invalido.
 */
router.put('/validation', userController.userValidation);

/**
 * @swagger
 * /users/updateUser/{id}:
 *   put:
 *     summary: Atualiza do Usuário.
 *     description: Atualização dos dados de um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *                properties:
 *                 usermane:
 *                   type: string
 *                   description: Nome do usuario.
 *                   example: Camila Jennifer
 *                 email:
 *                   type: string
 *                   example: camila.jennifer@gmail.com
 *                 password:
 *                   type: string
 *                   description: Senha do usuario.
 *                   example: xdfh648ffvn
 *     responses:
 *       201:
 *         description: Dados atualizados com sucesso
 */
router.put('/updateUser/:id', verify, userController.userUpdate);

/**
 * @swagger
 * /users/listUsers:
 *   get:
 *     summary: Recupera a lista de usuários.
 *     description: Recupera a lista de usuários
 *     responses:
 *       200:
 *         description: Uma lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 user:
 *                   type: array
 *                 id:
 *                   type: integer
 *                   description: ID do usuário.
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: Nome do usuário.
 *                   example: Camila Jennifer@gmail.com
 *                 email:
 *                   type: string
 *                   description: Email do usuário.
 *                   example: camila.jennifer@gmail.com
 *                 userAdmin:
 *                   type: boolean
 *                   description: Usuário admin.
 *                   example: true
*/
router.get('/listUsers', verify, userController.userList);

/**
  * @swagger
  * /users/getUser/{id}:
  *   get:
  *     summary: Buscar um usuário.
  *     parameters:
  *       - in: header
  *         name: Auth-Token
  *         schema:
  *           type: string
  *         required: true
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID numérico do usuário a ser recuperado.
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Usuário deletado com sucesso.
  *       content:
  *         application/json:
  *           schema:
  *                properties:
  *                 usermane:
  *                   type: string
  *                   description: Nome do usuario.
  *                   example: Camila Jennifer
  *                 email:
  *                   type: string
  *                   example: camila.jennifer@gmail.com
*/
router.get('/getUser/:id', verify, userController.getUser);

/**
  * @swagger
  * /users/delUser/{id}:
  *   delete:
  *     summary: Apaga um usuário.
  *     parameters:
  *       - in: header
  *         name: Auth-Token
  *         schema:
  *           type: string
  *         required: true
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID numérico do usuário a ser recuperado.
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Usuário deletado com sucesso.
 */
router.delete('/delUser/:id', verify, userController.userDelete);

module.exports = router;
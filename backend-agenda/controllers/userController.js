const db = require('../config/db.config');
const User = db.user;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");

const validateCodeUser = (email) => {

  const value = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    from: 'jennifer.silva@academico.ifpb.edu.br',
    to: email,
    subject: 'Confirmação de Email',
    text: 'Confirmação de Email',
    html: `<div style="border: 1px solid;padding: 25px; border-radius: 5px; width: 700px; height: 200px;">
                <h1 style="font-size: 26px;text-align: center;">Confirme seu endereço de e-mail para ativar sua conta.</h1>
                <p style="font-size: 20px;text-align: center;">Insira o código abaixo na página de confirmação de cadastro:</p>
                <div style="width: 700px; height: 50px;">
                  <div style="background-color: #1fbf57; border-radius: 5px; margin-left: 260px; width:120px; text-align:center; margin-top:30px">
                      <p><strong style="font-size: 22px; color: #ffffff;">${value}</strong></p>
                  </div>
                </div>
          </div>`
  }
  try {
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].headers)
        console.log(response[0].statusCode + "\n\n" + "Cole o código de 6 digitos enviado por email para confirmar seu cadastro")
      })
    return value;
  }
  catch (error) {
    console.error(error)
  }
};

// Cadastrar usuário
exports.userCreate = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  if (user != null) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newUser = Object.assign({}, req.body);
  newUser.password = hashedPassword;
  newUser.code = validateCodeUser(newUser.email);

  try {
    user = await User.create(newUser);
    res.json({ usuario: user });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Fazer login
exports.userLogin = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }

  const message = 'E-mail ou senha inválidos.';
  if (user == null) {
    return res.status(400).json({ message: message });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: message });
  }

  if (user.validatecode != null) {
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.header('Auth-Token', token).json({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userAdmin: user.userAdmin
      }
    });
  } else {
    res.json("Valide seu email");
  }

};

// Validar usuário
exports.userValidation = async (req, res) => {
  let user = null;
  try {
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
  } catch (err) {
    res.json({ message: err.message });
  }
  try {
    if (user.validatecode === null && user.code === req.body.validatecode) {
      user.validatecode = req.body.validatecode
      console.log(req.body)
      user = await User.update(req.body, {
        where: {
          email: req.body.email
        }
      });
      res.json("Validação realizada com sucesso");
    } else if (user.validatecode !== null && user.code === req.body.validatecode) {
      res.json("Email já verificado");
    } else {
      res.json("Código invalido");
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Atualizar um usuário
exports.userUpdate = async (req, res) => {
  const { username, email, password } = req.body;
  let user = null;
  try {
    user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    console.log(user.email, email)
    if (user.email != email && email != null) {
      user = await User.update(
        {
          email,
          validatecode: null,
          code: validateCodeUser(user.email)
        },
        {
          where:
          {
            id: req.params.id
          }
        }
      );
    }
  } catch (err) {
    res.json({ message: 'err.message' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const newPassword = hashedPassword;
  try {
    user = await User.update(
      {
        username,
        password: newPassword
      },
      {
        where:
        {
          id: req.params.id
        }
      }
    );
    res.json({ message: 'Dados atualizados com sucesso' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Listar todos os usuários
exports.userList = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: [
        'id',
        'username',
        'email',
        'userAdmin'
      ]
    });
    res.json({ User: user });
  } catch (err) {
    res.send({ message: err.message });
  }
};

// Apagar um usuário
exports.userDelete = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({ menssage: 'Usuário deletado com sucesso!!' });
  } catch (err) {
    res.send({ message: err.message });
  }
};

// Buscar um usuário por email
exports.getUser = async(req, res) => {
  console.log(req.params.id)
  try {
    const user = await User.findOne(
        {
          attributes: [
            'username',
            'email'
          ],
          where: {
            id: req.params.id
          },
        });
    res.json({ user: user });
  } catch(err) {
    res.send({ message: err.message });
  }
};

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const contatoRouter = require('./routes/contato');
const db = require('./config/db.config');
const User = db.user;
const intervalToDuration = require("date-fns/intervalToDuration");

const app = express();

// config dotenv and sequelize
dotenv.config();
db.sync();

// swagger set up
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API REST Express de um gerenciador simples de contatos.',
    version: '1.0.0',
    description:
      'Esta é uma aplicação de API REST feita com Express.' +
      'Ela utiliza dados de uma agenda de contatos.',
    license: {
      name: 'Licenciado sob GPL.',
      url: 'https://github.com/pauloewerton/pw2-2021-1',
    },
    contact: {
      name: 'Paulo Ewerton',
      url: 'https://github.com/pauloewerton',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://pw2-render-test.onrender.com',
      description: 'Deployment server',
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./routes/user.js', './routes/contato.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contato', contatoRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function validation() {
  let users = [];
  try {
    users = await User.findAll({
      where: {
        validatecode: null
      }
    });
  } catch (err) {
    console.log({message: err.message});
  }

  try {
    let cont = 0;
    users.map(async user => {
      const comparator = intervalToDuration({
        start: new Date(user.createdAt),
        end: new Date()
      });

      if (comparator.years > 0 || comparator.months > 0 || comparator.days > 0 || comparator.hours > 0) {
        cont += 1;
        await User.destroy({
          where: {
            email: user.email
          }
        });
      }
    })
    console.log(`${cont} Usuários inativos deletados com sucesso!`);
  } catch (err) {
    console.log({message: err.message});
  }
}

validation();
// Renderizar função a cada 1h
setInterval(validation, 3600000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;

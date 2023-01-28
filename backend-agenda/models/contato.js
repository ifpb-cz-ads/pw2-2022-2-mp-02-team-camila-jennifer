module.exports = (sequelize, Sequelize) => {
  const Contato = sequelize.define('contato', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        allowEmpty: false
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: true,
        allowEmpty: true,
        len: [6, 6]
    },
  });

  return Contato;
};

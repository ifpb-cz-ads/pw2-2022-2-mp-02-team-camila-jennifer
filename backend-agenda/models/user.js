module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            allowEmpty: false,
            len: [6, 255]
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            allowEmpty: false,
            len: [6, 255]
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            allowEmpty: false,
            len: [6, 1024]
        },
        validatecode: {
            type: Sequelize.INTEGER,
            allowNull: true,
            allowEmpty: true,
            len: [6, 6]
        },
        code: {
            type: Sequelize.INTEGER,
            allowNull: false,
            allowEmpty: false,
            len: [6, 6]
        },
        userAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            allowEmpty: false,
        }
    });

    return User;
};

'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {
  const definition = {
    avatar: {
      type: DataType.BLOB
    },
    email: {
      allowNull: false,
      type: DataType.STRING(250),
      unique: true
    },
    id: {
      allowNull: false,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      type: DataType.UUID,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataType.STRING(100)
    },
    password: {
      allowNull: false,
      type: DataType.STRING
    }
  };

  const options = {
    classMethods: {
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)
    },
    hooks: {
      beforeBulkCreate: function(users) {
        users.forEach(user => {
          const salt = bcrypt.genSaltSync();
          user.dataValues.senha = bcrypt.hashSync(user.dataValues.senha, salt);
        });
      },
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.senha = bcrypt.hashSync(user.senha, salt);
      }
    },
    instanceMethods: {
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)
    },
    schema: 'security',
    tableName: 'tbl_user'
  };

  return sequelize.define('UserModel', definition, options);
};

'use strict';

const bcrypt = require('bcryptjs');

const EMAIL_MAXLENGTH = 250;
const NAME_MAXLENGTH = 100;

module.exports = UserModel;
module.exports.EMAIL_MAXLENGTH = EMAIL_MAXLENGTH;
module.exports.NAME_MAXLENGTH = NAME_MAXLENGTH;

function UserModel(sequelize, DataType) {
  const definition = {
    avatar: {
      type: DataType.BLOB
    },
    email: {
      allowNull: false,
      type: DataType.STRING(EMAIL_MAXLENGTH),
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
      type: DataType.STRING(NAME_MAXLENGTH)
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
          user.dataValues.password = bcrypt.hashSync(user.dataValues.password, salt);
        });
      },
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)

    },
    schema: 'security',
    tableName: 'tbl_user'
  };

  return sequelize.define('UserModel', definition, options);
}


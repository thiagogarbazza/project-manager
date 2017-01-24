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
      allowNull: true,
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
    hooks: {
      beforeBulkCreate,
      beforeCreate
    },
    instanceMethods: {isPassword},
    schema: 'security',
    tableName: 'tbl_user'
  };

  return sequelize.define('UserModel', definition, options);
}

function beforeBulkCreate(users) {
  users.forEach(user => {
    beforeCreate(user.dataValues);
  });
}

function beforeCreate(user) {
  user.password = cryptPassword(user.password);
}

function isPassword(password) {
  return comparePassword(password, this.password);
}

function cryptPassword(password) {
  const salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, encodedPassword) {
  return bcrypt.compareSync(password, encodedPassword);
}

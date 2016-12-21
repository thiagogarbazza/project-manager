'use strict';

const COLOR_MAXLENGTH = 30;
const NAME_MAXLENGTH = 100;

module.exports = (sequelize, DataType) => {
  const definition = {
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataType.BOOLEAN
    },
    color: {
      allowNull: true,
      type: DataType.STRING(COLOR_MAXLENGTH)
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataType.DATE
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
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataType.DATE
    }
  };

  const options = {
    classMethods: {associate},
    schema: 'client',
    tableName: 'tbl_client'
  };

  return sequelize.define('ClientModel', definition, options);
};

function associate(domain) {
  const clientModel = domain.client.ClientModel;
  const userModel = domain.security.user.UserModel;

  clientModel.belongsTo(userModel, {
    as: 'creationByUser',
    foreignKey: {
      allowNull: false,
      field: 'created_by',
      name: 'createdBy'
    }
  });

  clientModel.belongsTo(userModel, {
    as: 'updatedByUser',
    foreignKey: {
      allowNull: false,
      field: 'updated_by',
      name: 'updatedBy'
    }
  });
}

module.exports.COLOR_MAXLENGTH = COLOR_MAXLENGTH;
module.exports.NAME_MAXLENGTH = NAME_MAXLENGTH;

'use strict';

module.exports = (sequelize, DataType) => {
  const definition = {
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataType.BOOLEAN
    },
    color: {
      allowNull: true,
      type: DataType.STRING(20)
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
      type: DataType.STRING(100)
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataType.DATE
    }
  };

  const options = {
    classMethods: {
      associate: domain => {
        const clientModel = domain.client.ClientModel;
        const userModel = domain.security.user.UserModel;

        clientModel.belongsTo(userModel, {
          as: 'creationByUser',
          foreignKey: {
            field: 'created_by',
            name: 'createdBy'
          }
        });

        clientModel.belongsTo(userModel, {
          as: 'updatedByUser',
          foreignKey: {
            field: 'updated_by',
            name: 'updatedBy'
          }
        });
      }
    },
    schema: 'client',
    tableName: 'tbl_client'
  };

  return sequelize.define('ClientModel', definition, options);
};

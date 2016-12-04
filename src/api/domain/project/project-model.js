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
    description: {
      allowNull: true,
      type: DataType.STRING(500)
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
        const projectModel = domain.project.ProjectModel;
        const userModel = domain.security.user.UserModel;

        projectModel.belongsTo(clientModel, {
          as: 'client',
          foreignKey: {
            field: 'client_id',
            name: 'clientId'
          }
        });

        projectModel.belongsTo(userModel, {
          as: 'creationByUser',
          foreignKey: {
            field: 'created_by',
            name: 'createdBy'
          }
        });

        projectModel.belongsTo(userModel, {
          as: 'updatedByUser',
          foreignKey: {
            field: 'updated_by',
            name: 'updatedBy'
          }
        });
      }
    },
    schema: 'project',
    tableName: 'tbl_project'
  };

  return sequelize.define('ProjectModel', definition, options);
};

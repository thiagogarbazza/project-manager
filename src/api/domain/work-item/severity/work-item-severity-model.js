'use strict';

module.exports = (sequelize, DataType) => {
  const definition = {
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
    icon: {
      allowNull: true,
      type: DataType.STRING(20)
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
      type: DataType.STRING(50)
    },
    order: {
      allowNull: false,
      type: DataType.INTEGER
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
        const workItemSeverityModel = domain.workItem.severity.WorkItemSeverityModel;
        const projectModel = domain.project.ProjectModel;
        const userModel = domain.security.user.UserModel;

        workItemSeverityModel.belongsTo(projectModel, {
          as: 'project',
          foreignKey: {
            field: 'project_id',
            name: 'projectId'
          }
        });

        workItemSeverityModel.belongsTo(userModel, {
          as: 'creationByUser',
          foreignKey: {
            field: 'created_by',
            name: 'createdBy'
          }
        });

        workItemSeverityModel.belongsTo(userModel, {
          as: 'updatedByUser',
          foreignKey: {
            field: 'updated_by',
            name: 'updatedBy'
          }
        });
      }
    },
    schema: 'work_item',
    tableName: 'tbl_work_item_severity'
  };

  return sequelize.define('WorkItemSeverityModel', definition, options);
};

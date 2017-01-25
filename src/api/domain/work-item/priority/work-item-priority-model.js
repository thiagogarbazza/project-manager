'use strict';

const DESCRIPTION_MAXLENGTH = 500;
const NAME_MAXLENGTH = 100;

module.exports = WorkItemPriorityModel;
module.exports.DESCRIPTION_MAXLENGTH = DESCRIPTION_MAXLENGTH;
module.exports.NAME_MAXLENGTH = NAME_MAXLENGTH;

function WorkItemPriorityModel(sequelize, DataType) {
  const definition = {
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataType.DATE
    },
    default: {
      allowNull: false,
      defaultValue: false,
      type: DataType.BOOLEAN
    },
    description: {
      allowNull: true,
      type: DataType.STRING(DESCRIPTION_MAXLENGTH)
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
    classMethods: {associate},
    schema: 'work_item',
    tableName: 'tbl_work_item_priority'
  };

  return sequelize.define('WorkItemPriorityModel', definition, options);
}

function associate(domain) {
  const workItemPriorityModel = domain.workItem.priority.WorkItemPriorityModel;
  const userModel = domain.security.user.UserModel;

  workItemPriorityModel.belongsTo(userModel, {
    as: 'creationByUser',
    foreignKey: {
      field: 'created_by',
      name: 'createdBy'
    }
  });

  workItemPriorityModel.belongsTo(userModel, {
    as: 'updatedByUser',
    foreignKey: {
      field: 'updated_by',
      name: 'updatedBy'
    }
  });
}

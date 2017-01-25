'use strict';

const DESCRIPTION_MAXLENGTH = 500;
const COLOR_MAXLENGTH = 30;
const ICON_MAXLENGTH = 20;
const NAME_MAXLENGTH = 100;

module.exports = WorkItemTypeModel;
module.exports.DESCRIPTION_MAXLENGTH = DESCRIPTION_MAXLENGTH;
module.exports.COLOR_MAXLENGTH = COLOR_MAXLENGTH;
module.exports.ICON_MAXLENGTH = ICON_MAXLENGTH;
module.exports.NAME_MAXLENGTH = NAME_MAXLENGTH;

function WorkItemTypeModel(sequelize, DataType) {
  const definition = {
    color: {
      allowNull: true,
      type: DataType.STRING(COLOR_MAXLENGTH)
    },
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
    icon: {
      allowNull: true,
      type: DataType.STRING(ICON_MAXLENGTH)
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
    schema: 'work_item',
    tableName: 'tbl_work_item_type'
  };

  return sequelize.define('WorkItemTypeModel', definition, options);
}

function associate(domain) {
  const workItemTypeModel = domain.workItem.severity.WorkItemTypeModel;
  const userModel = domain.security.user.UserModel;

  workItemTypeModel.belongsTo(userModel, {
    as: 'creationByUser',
    foreignKey: {
      field: 'created_by',
      name: 'createdBy'
    }
  });

  workItemTypeModel.belongsTo(userModel, {
    as: 'updatedByUser',
    foreignKey: {
      field: 'updated_by',
      name: 'updatedBy'
    }
  });
}

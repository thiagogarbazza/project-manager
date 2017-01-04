'use strict';

const DESCRIPTION_MAXLENGTH = 500;
const COLOR_MAXLENGTH = 30;
const KEY_MAXLENGTH = 20;
const NAME_MAXLENGTH = 100;

module.exports = ProjectModel;
module.exports.DESCRIPTION_MAXLENGTH = DESCRIPTION_MAXLENGTH;
module.exports.COLOR_MAXLENGTH = COLOR_MAXLENGTH;
module.exports.KEY_MAXLENGTH = KEY_MAXLENGTH;
module.exports.NAME_MAXLENGTH = NAME_MAXLENGTH;

function ProjectModel(sequelize, DataType) {
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
    key: {
      allowNull: false,
      type: DataType.STRING(KEY_MAXLENGTH)
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
    schema: 'project',
    tableName: 'tbl_project'
  };

  return sequelize.define('ProjectModel', definition, options);
}

function associate(domain) {
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

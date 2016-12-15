'use strict';

const NAME_MAXLENGTH = 100;

module.exports = (sequelize, DataType) => {
  const definition = {
    content: {
      allowNull: true,
      type: DataType.TEXT
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
    schema: 'document',
    tableName: 'tbl_document'
  };

  return sequelize.define('DocumentModel', definition, options);
};

function associate(domain) {
  const documentModel = domain.document.DocumentModel;
  const projectModel = domain.project.ProjectModel;
  const userModel = domain.security.user.UserModel;

  documentModel.belongsTo(projectModel, {
    as: 'project',
    foreignKey: {
      field: 'project_id',
      name: 'projectId'
    }
  });

  documentModel.belongsTo(userModel, {
    as: 'creationByUser',
    foreignKey: {
      field: 'created_by',
      name: 'createdBy'
    }
  });

  documentModel.belongsTo(userModel, {
    as: 'updatedByUser',
    foreignKey: {
      field: 'updated_by',
      name: 'updatedBy'
    }
  });
}

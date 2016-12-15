'use strict';

const NAME_MAXLENGTH = 100;

module.exports = (sequelize, DataType) => {
  const definition = {
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataType.DATE
    },
    end: {
      allowNull: false,
      type: DataType.DATEONLY
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
    start: {
      allowNull: false,
      type: DataType.DATEONLY
    },
    text: {
      allowNull: true,
      type: DataType.TEXT
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataType.DATE
    }
  };

  const options = {
    classMethods: {associate},
    schema: 'iteration',
    tableName: 'tbl_iteration'
  };

  return sequelize.define('IterationModel', definition, options);
};

function associate(domain) {
  const iterationModel = domain.iteration.IterationModel;
  const projectModel = domain.project.ProjectModel;
  const userModel = domain.security.user.UserModel;

  iterationModel.belongsTo(iterationModel, {
    as: 'parent',
    foreignKey: {
      field: 'parent_id',
      name: 'parentId'
    }
  });

  iterationModel.belongsTo(projectModel, {
    as: 'project',
    foreignKey: {
      field: 'project_id',
      name: 'projectId'
    }
  });

  iterationModel.belongsTo(userModel, {
    as: 'creationByUser',
    foreignKey: {
      field: 'created_by',
      name: 'createdBy'
    }
  });

  iterationModel.belongsTo(userModel, {
    as: 'updatedByUser',
    foreignKey: {
      field: 'updated_by',
      name: 'updatedBy'
    }
  });
}

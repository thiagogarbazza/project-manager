module.exports = (sequelize, DataType) => {

  const definition = {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: 4
      }
    },

    code: {
      type: DataType.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },

    name: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    description: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    points: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0
      }
    },

    content: {
      type: DataType.TEXT,
      allowNull: true,
    }

  };

  const options ={
    tableName: 'document.tbl_document',
    validate: {
      codeIsUniqueInProject: function() {
        if ((this.projectId === null) !== (this.stateId === null)) {
          throw new Error('Require either both latitude and longitude or neither')
        }
      }
    },
    classMethods: {
      associate: (domain) => {
        Documents.belongsTo(domain.project.Projects, {as: 'project', foreignKey: 'projectId'});
        Documents.belongsTo(domain.document.Documents, {as: 'father_document', foreignKey: 'fatherDocumentId'});
        Documents.belongsTo(domain.document.DocumentTypes, {as: 'type', foreignKey: 'typeId'});
        Documents.belongsTo(domain.document.DocumentStates, {as: 'state', foreignKey: 'stateId'});
      }
    }
  };

  const Documents =  sequelize.define("Documents", definition, options);
  return Documents;
};

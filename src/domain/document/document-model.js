module.exports = (sequelize, DataType) => {

  const definition = {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },

    code: {
      type: DataType.STRING(8),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },

    name: {
      type: DataType.STRING,
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
      type: DataType.INTEGER,
      allowNull: true,
    },

    content: {
      type: DataType.TEXT,
      allowNull: true,
    }

  };

  const options ={
    tableName: 'document.tbl_document',
    classMethods: {
      associate: (domain) => {
        Documents.belongsTo(domain.project.Projects);
        Documents.belongsTo(domain.document.DocumentStatus);
        Documents.belongsTo(domain.document.DocumentTypes);
      }
    }
  };

  let Documents =  sequelize.define("Documents", definition, options);
  return Documents;
};

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
    }

  };

  const options ={
    tableName: 'tbl_project',
    classMethods: {
      associate: (domain) => {
        //Projects.hasMany(domain.document.Documents);
      }
    }
  };

  const Projects =  sequelize.define("Projects", definition, options);
  Projects.schema('project');
  
  return Projects;
};

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
      type: DataType.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    icon: {
      type: DataType.STRING(20),
      allowNull: true
    },

  };

  const options ={
    tableName: 'document.tbl_type'
  };

  let DocumentTypes =  sequelize.define("DocumentTypes", definition, options);
  return DocumentTypes;
};

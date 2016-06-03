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

    name: {
      type: DataType.STRING(60),
      allowNull: false,
      unique: true,
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
    tableName: 'tbl_type'
  };

  let DocumentTypes =  sequelize.define("DocumentTypes", definition, options);
  DocumentTypes.schema('document');

  return DocumentTypes;
};

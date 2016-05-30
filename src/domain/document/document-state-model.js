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

    color: {
      type: DataType.STRING(7),
      allowNull: true
    },

  };

  const options ={
    tableName: 'document.tbl_states'
  };

  let DocumentStates =  sequelize.define("DocumentStates", definition, options);
  return DocumentStates;
};

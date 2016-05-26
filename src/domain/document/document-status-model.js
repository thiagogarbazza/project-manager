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

    color: {
      type: DataType.STRING(7),
      allowNull: true
    },

  };

  const options ={
    tableName: 'document.tbl_status'
  };

  let DocumentStatus =  sequelize.define("DocumentStatus", definition, options);
  return DocumentStatus;
};

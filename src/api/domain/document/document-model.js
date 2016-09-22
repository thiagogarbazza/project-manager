'use strict';
module.exports = (sequelize, DataType) => {

  const definition = {};

  const options = {
    schema: 'document',
    tableName: 'tbl_document'
  };

  return sequelize.define('DocumentModel', definition, options);
};

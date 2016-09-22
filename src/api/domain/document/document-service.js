'use strict';
const DocumentValidate = require('./document-validate');


module.exports = app => {
  const Document = app.domain.document.DocumentModel;
  const documentValidate = new DocumentValidate(app);

  const service = {
    create,
    destroy,
    find,
    findById,
    update
  };

  return service;

  function create(document) {
    return new Promise((resolve, reject) => {
      documentValidate
        .onCreate(document)
        .then(() => {
          Document
            .create(document)
            .then(result => resolve(result))
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  }

  function destroy(id) {
    return Document.destroy({
      where: {
        id
      }
    });
  }

  function find(filter) {
    let where = {};

    //where.projectId = req.query.projectId;

    if (filter.code) {
      where.code = {
        like: `%${filter.code}%`
      };
    }
    if (filter.name) {
      where.name = {
        like: `%${filter.name}%`
      };
    }

    return Document.findAll({
      attributes: ['id', 'code', 'name'],
      order: 'code ASC',
      where
    });
  }

  function findById(id) {
    return Document.findOne({
      where: {
        id
      }
    });
  }

  function update(id, document) {
    return Document.update(document, {
      where: {
        id
      }
    });
  }
};

module.exports = app => {
  const Document = app.domain.document.Documents;
  const service = {
    create,
    destroy,
    find,
    findById,
    update
  };

  return service;

  function create(document) {
    return Document.create(document);
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

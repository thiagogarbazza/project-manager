module.exports = app => {
  const Documents = app.domain.document.Documents;
  const service = {
    pesquisar
  };

  return service;

  function pesquisar(filter) {
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

    return Documents.findAll({
      attributes: ['id', 'code', 'name'],
      order: 'code ASC',
      where
    });
  }
};

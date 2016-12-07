'use strict';

const AbstractDomainService = require('../abstract-domain-service');
const DocumentValidate = require('./document-validate');

class DocumentService extends AbstractDomainService {
  constructor(app) {
    super(app);
    this.documentModel = app.domain.document.DocumentModel;
    this.documentValidate = new DocumentValidate(app);
    this.userModel = app.domain.security.user.UserModel;
  }

  create(document, user) {
    return this.fillCreatedBy(document, user)
      .then(() => this.documentValidate.onCreate(document))
      .then(() => this.documentModel.create(document));
  }

  destroy(id) {
    const quering = {where: {id}};

    return this.documentModel.destroy(quering);
  }

  find(filter) {
    const quering = {
      attributes: ['id', 'name'],
      order: 'name ASC',
      where: {}
    };

    if (filter.name) {
      quering.where.name = {like: `%${filter.name}%`};
    }

    return this.documentModel.findAll(quering);
  }

  findById(id) {
    const quering = {
      include: [{
        as: 'creationByUser',
        attributes: ['id', 'name', 'email', 'avatar'],
        model: this.userModel
      }, {
        as: 'updatedByUser',
        attributes: ['id', 'name', 'email', 'avatar'],
        model: this.userModel
      }]
    };

    return this.documentModel.findById(id, quering);
  }

  update(id, document, user) {
    const quering = {where: {id}};

    return this.fillUpdatedBy(document, user)
      .then(() => this.documentValidate.onUpdate(document))
      .then(() => this.documentModel.update(document, quering));
  }
}

module.exports = DocumentService;

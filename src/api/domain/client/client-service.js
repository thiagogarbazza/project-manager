'use strict';

const AbstractDomainService = require('../abstract-domain-service');
const ClientValidate = require('./client-validate');

class ClientService extends AbstractDomainService {
  constructor(app) {
    super(app);
    this.clientModel = app.domain.client.ClientModel;
    this.clientValidate = new ClientValidate(app);
    this.userModel = app.domain.security.user.UserModel;
  }

  create(client, user) {
    return this.fillCreatedBy(client, user)
      .then(() => this.clientValidate.onCreate(client))
      .then(() => this.clientModel.create(client));
  }

  destroy(id) {
    const quering = {where: {id}};

    return this.clientModel.destroy(quering);
  }

  find(filter) {
    const quering = {
      attributes: ['id', 'name', 'color', 'active'],
      order: 'name ASC',
      where: {}
    };

    if (filter.name) {
      quering.where.name = {like: `%${filter.name}%`};
    }

    return this.clientModel.findAll(quering);
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

    return this.clientModel.findById(id, quering);
  }

  update(id, client, user) {
    const quering = {where: {id}};

    return this.fillUpdatedBy(client, user)
      .then(() => this.clientValidate.onUpdate(client))
      .then(() => this.clientModel.update(client, quering));
  }
}

module.exports = ClientService;

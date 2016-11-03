'use strict';

class AbstractDomainService {
  constructor(app) {
    this.userModel = app.domain.security.user.UserModel;
  }

  preencherAuditoriaAoCriar(domain, user) {
    const now = new Date();

    domain.createdAt = now;
    domain.createdBy = user.id;
    domain.updatedAt = now;
    domain.updatedBy = user.id;

    return Promise.resolve(domain);
  }

  preencherAuditoriaAoAtualizar(domain, user) {
    const now = new Date();

    domain.updatedBy = user.id;
    domain.updatedAt = now;

    return Promise.resolve(domain);
  }
}

module.exports = AbstractDomainService;

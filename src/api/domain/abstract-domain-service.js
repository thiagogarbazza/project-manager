'use strict';

class AbstractDomainService {
  constructor(app) {
    this.userModel = app.domain.security.user.UserModel;
  }

  fillCreatedBy(domain, user) {
    const now = new Date();

    domain.createdAt = now;
    domain.createdBy = user.id;
    domain.updatedAt = now;
    domain.updatedBy = user.id;

    return Promise.resolve(domain);
  }

  fillUpdatedBy(domain, user) {
    const now = new Date();

    domain.updatedBy = user.id;
    domain.updatedAt = now;

    return Promise.resolve(domain);
  }
}

module.exports = AbstractDomainService;

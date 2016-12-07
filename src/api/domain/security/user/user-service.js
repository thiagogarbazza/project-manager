'use strict';

const UserValidate = require('./user-validate');

class UserService {
  constructor(app) {
    this.userModel = app.domain.security.user.UserModel;
    this.userValidate = new UserValidate(app);
  }

  create(user) {
    return this.userValidate.onCreate(user)
      .then(() => this.userModel.create(user));
  }

  find(filter) {
    const quering = {
      attributes: ['id', 'name', 'email', 'avatar'],
      order: [
        ['name', 'ASC'],
        ['email', 'ASC']
      ],
      where: {}
    };

    if (filter.name) {
      quering.where.name = {like: `%${filter.name}%`};
    }

    return this.userModel.findAll(quering);
  }

  findByEmail(email) {
    const quering = {where: {email}};

    return this.userModel.findOne(quering);
  }

  findById(id) {
    return this.userModel.findById(id);
  }

  update(id, user) {
    const quering = {where: {id}};

    return this.userValidate.onUpdate(user)
      .then(() => this.userModel.update(user, quering));
  }
}

module.exports = UserService;

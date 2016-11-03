'use strict';
const UserValidate = require('../../../../api/domain/security/user/user-validate');

describe('api domain security user validate', () => {
  const APP = {};
  let USER;
  let userValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.security.user.UserModel', {});

    USER = {
      email: 'thiagogarbazza@gmail.com',
      id: '36726e94-fbd2-4152-a0ac-92ac494ce65a',
      name: 'Thiago Garbazza',
      password: 'swordfish'
    };

    userValidate = new UserValidate(APP);
  });

  it('should be defined', () => {
    expect(userValidate).to.not.be.undefined;
  });

  it('e-mail should be required', done => {
    delete USER.email;

    userValidate.emailIsRequired(USER)
      .then(result => {
        expect(result.code).to.equal('user.email.required');
        expect(result.message).to.equal('E-mail is required');
        return done();
      })
      .catch(done);
  });

  it('e-mail should be valid', done => {
    USER.email = 'thiagogarbazza#gmail.com';

    userValidate.emailIsValid(USER)
      .then(result => {
        expect(result.code).to.equal('user.email.valid');
        expect(result.message).to.equal('E-mail must be valid');
        return done();
      })
      .catch(done);
  });

  it('e-mail should be maximum 250 characters', done => {
    USER.email = properties.BIG_TEXT;

    userValidate.emailMustHaveMaximum250Characters(USER)
      .then(result => {
        expect(result.code).to.equal('user.email.maxlength');
        expect(result.message).to.equal('E-mail must have a maximum of 250 characters');
        return done();
      })
      .catch(done);
  });

  it('e-mail should be unique, a new and unique case', done => {
    const anotherUser = clone(USER);
    anotherUser.email = 'fake@gmail.com';
    APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith();

    userValidate.emailMustBeUnique(anotherUser)
      .then(result => {
        expect(APP.domain.security.user.UserModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('e-mail should be unique, a new and non unique case', done => {
    const anotherUser = clone(USER);
    delete anotherUser.id;
    APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith(USER);

    userValidate.emailMustBeUnique(anotherUser)
      .then(result => {
        expect(result.code).to.equal('user.email.unique');
        expect(result.message).to.equal('E-mail must be unique');
        return done();
      })
      .catch(done);
  });

  it('e-mail should be unique, a update and unique case', done => {
    const anotherUser = clone(USER);
    APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith(USER);

    userValidate.emailMustBeUnique(anotherUser)
      .then(result => {
        expect(APP.domain.security.user.UserModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('e-mail should be unique, a update and non unique case', done => {
    const anotherUser = clone(USER);
    anotherUser.id = 'e218343f-8f9e-4b2b-bbf6-e862506b34da';
    APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith(USER);

    userValidate.emailMustBeUnique(anotherUser)
      .then(result => {
        expect(result.code).to.equal('user.email.unique');
        expect(result.message).to.equal('E-mail must be unique');
        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete USER.name;

    userValidate.nameIsRequired(USER)
      .then(result => {
        expect(result.code).to.equal('user.name.required');
        expect(result.message).to.equal('Name is required');
        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    USER.name = properties.BIG_TEXT;

    userValidate.nameMustHaveMaximum100Characters(USER)
      .then(result => {
        expect(result.code).to.equal('user.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 100 characters');
        return done();
      })
      .catch(done);
  });

  it('password should be required', done => {
    delete USER.password;

    userValidate.passwordIsRequired(USER)
      .then(result => {
        expect(result.code).to.equal('user.password.required');
        expect(result.message).to.equal('Password is required');
        return done();
      })
      .catch(done);
  });

  it('password should be minimum 100 characters', done => {
    USER.password = ')!@#';

    userValidate.passwordMustHaveMinimum5Characters(USER)
      .then(result => {
        expect(result.code).to.equal('user.password.minlength');
        expect(result.message).to.equal('Password must have a minimum  of 5 characters');
        return done();
      })
      .catch(done);
  });

  describe('# onCreate', () => {
    beforeEach(() => {
      delete USER.id;
      APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith();
    });

    it('create a new valid user', done => {
      userValidate.onCreate(USER)
        .then(() => done())
        .catch(done);
    });

    it('create a new invalid user', done => {
      delete USER.email;
      delete USER.name;

       userValidate.onCreate(USER)
        .then(() => done('should be error'))
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(2);
          expect(error.errors[0].code).to.equal('user.email.required');
          expect(error.errors[1].code).to.equal('user.name.required');
          return done();
        });
    });
  });

  describe('# onUpdate', () => {
    beforeEach(() => {
       APP.domain.security.user.UserModel.findOne = simpleMock.stub().resolveWith();
    });

    it('update a valid user', done => {
      userValidate.onUpdate(USER)
        .then(() => done())
        .catch(error => done(error));
    });

    it('update a invalid user', done => {
      delete USER.email;
      delete USER.name;

      userValidate.onUpdate(USER)
        .then(() => done())
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(2);
          expect(error.errors[0].code).to.equal('user.email.required');
          expect(error.errors[1].code).to.equal('user.name.required');
          return done();
        });
    });
  });
});

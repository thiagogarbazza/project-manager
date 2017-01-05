'use strict';

const ProjectValidate = require('../../../api/domain/project/project-validate');

describe('api domain project validate', () => {
  const APP = {};
  let PROJECT;
  let projectValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.project.ProjectModel', {});

    PROJECT = {
      active: true,
      clientId: '2103c936-6613-4479-975c-cd1a87fe1e41',
      color: '',
      description: 'An ESLint shareable config for the restrict js coding style.',
      id: '43cf39a6-f1a8-48fe-a76b-ee042cb2ea9a',
      key: 'ESCR',
      name: 'eslint-config-restrict'
    };

    projectValidate = new ProjectValidate(APP);
  });

  it('should be defined', () => {
    expect(projectValidate).to.not.be.undefined;
  });

  it('color should be maximum 30 characters', done => {
    PROJECT.color = properties.BIG_TEXT;

    projectValidate.colorMustHaveMaximum30Characters(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.color.maxlength');
        expect(result.message).to.equal('Color must have a maximum of 30 characters');

        return done();
      })
      .catch(done);
  });

  it('description should be maximum 500 characters', done => {
    PROJECT.description = properties.BIG_TEXT;

    projectValidate.descriptionMustHaveMaximum500Characters(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.description.maxlength');
        expect(result.message).to.equal('Description must have a maximum of 500 characters');

        return done();
      })
      .catch(done);
  });

  it('key should be required', done => {
    delete PROJECT.key;

    projectValidate.keyIsRequired(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.key.required');
        expect(result.message).to.equal('Key is required');

        return done();
      })
      .catch(done);
  });

  it('key should be unique, Sending a new key', done => {
    const anotherProject = clone(PROJECT);

    anotherProject.key = 'SOC2';
    APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith();

    projectValidate.keyMustBeUnique(anotherProject)
      .then(() => {
        expect(APP.domain.project.ProjectModel.findOne.callCount).to.equal(1);

        return done();
      })
      .catch(done);
  });

  it('key should be unique, Sending same key with equal ID', done => {
    const anotherProject = clone(PROJECT);

    APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith(PROJECT);

    projectValidate.keyMustBeUnique(anotherProject)
      .then(() => {
        expect(APP.domain.project.ProjectModel.findOne.callCount).to.equal(1);

        return done();
      })
      .catch(done);
  });

  it('key should be unique, Sending same key with different ID´s', done => {
    const anotherProject = clone(PROJECT);

    anotherProject.id = '087d16bc-dfe0-45a4-b897-a2878570377b';
    APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith(PROJECT);

    projectValidate.keyMustBeUnique(anotherProject)
      .then(result => {
        expect(APP.domain.project.ProjectModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('project.key.unique');
        expect(result.message).to.equal('Key must be unique');

        return done();
      })
      .catch(done);
  });

  it('key should be maximum 20 characters', done => {
    PROJECT.key = properties.BIG_TEXT;

    projectValidate.keyMustHaveMaximum20Characters(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.key.maxlength');
        expect(result.message).to.equal('Key must have a maximum of 20 characters');

        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete PROJECT.name;

    projectValidate.nameIsRequired(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.name.required');
        expect(result.message).to.equal('Name is required');

        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    PROJECT.name = properties.BIG_TEXT;

    projectValidate.nameMustHaveMaximum100Characters(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 100 characters');

        return done();
      })
      .catch(done);
  });

  describe('# onCreate', () => {
    beforeEach(() => {
      delete PROJECT.id;
      APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith();
    });

    it('create a new valid project', done => {
      projectValidate.onCreate(PROJECT)
        .then(() => done())
        .catch(done);
    });

    it('create a new invalid project', done => {
      const expected1Erros = 1;

      delete PROJECT.name;

      projectValidate.onCreate(PROJECT)
        .then(() => done('should be error'))
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(expected1Erros);
          expect(error.errors[0].code).to.equal('project.name.required');

          return done();
        });
    });
  });

  describe('# onUpdate', () => {
    beforeEach(() => {
      APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith();
    });

    it('update a valid project', done => {
      projectValidate.onUpdate(PROJECT)
        .then(() => done())
        .catch(error => done(error));
    });

    it('update a invalid project', done => {
      const expected1Erros = 1;

      delete PROJECT.name;

      projectValidate.onUpdate(PROJECT)
        .then(() => done())
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(expected1Erros);
          expect(error.errors[0].code).to.equal('project.name.required');

          return done();
        });
    });
  });
});

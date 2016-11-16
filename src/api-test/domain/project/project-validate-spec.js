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
      color: '',
      id: 'a0b31574-658f-4517-8d62-4450811a15e7',
      name: 'Settlers Of Catan'
    };

    projectValidate = new ProjectValidate(APP);
  });

  it('should be defined', () => {
    expect(projectValidate).to.not.be.undefined;
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

  it('name should be unique, Sending a new name', done => {
    const anotherProject = clone(PROJECT);
    anotherProject.name = 'Settlers Of Catan 2';
    APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith();

    projectValidate.nameMustBeUnique(anotherProject)
      .then(() => {
        expect(APP.domain.project.ProjectModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherProject = clone(PROJECT);
    APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith(PROJECT);

    projectValidate.nameMustBeUnique(anotherProject)
      .then(result => {
        expect(APP.domain.project.ProjectModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherProject = clone(PROJECT);
    anotherProject.id = '087d16bc-dfe0-45a4-b897-a2878570377b';
    APP.domain.project.ProjectModel.findOne = simpleMock.stub().resolveWith(PROJECT);

    projectValidate.nameMustBeUnique(anotherProject)
      .then(result => {
        expect( APP.domain.project.ProjectModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('project.name.unique');
        expect(result.message).to.equal('Name must be unique');
        return done();
      })
      .catch(done);
  });

  it('color should be maximum 20 characters', done => {
    PROJECT.color = properties.BIG_TEXT;

    projectValidate.colorMustHaveMaximum20Characters(PROJECT)
      .then(result => {
        expect(result.code).to.equal('project.color.maxlength');
        expect(result.message).to.equal('Color must have a maximum of 20 characters');
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
      delete PROJECT.name;

       projectValidate.onCreate(PROJECT)
        .then(() => done('should be error'))
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(1);
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
      delete PROJECT.name;

      projectValidate.onUpdate(PROJECT)
        .then(() => done())
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(1);
          expect(error.errors[0].code).to.equal('project.name.required');
          return done();
        });
    });
  });
});

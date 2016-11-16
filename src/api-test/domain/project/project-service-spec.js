'use strict';

let PROJECT = {
  id: '11e612a6-d7e4-4435-a301-8ed155601250',
  name: 'key-code'
};

const PROJECT_VALIDATE = class {
  constructor(app) {}
  onCreate(project) {
    return project.name ? Promise.resolve() : Promise.reject({
      name: 'BusinessError'
    });
  }
  onUpdate(project) {
    return project.name ? Promise.resolve() : Promise.reject({
      name: 'BusinessError'
    });
  }
};

describe('api domain project service', () => {
  const APP = {};
  let USER;
  let ProjectService;
  let projectService;

  before(() => {
    mockery.registerMock('./project-validate', PROJECT_VALIDATE);
    mockery.registerAllowable('../../../api/domain/project/project-service');
    ProjectService = require('../../../api/domain/project/project-service');
  });

  after(() => {
    mockery.deregisterMock('./project-validate');
  });

  beforeEach(() => {
    dottie.set(APP, 'domain.client.ClientModel', {});
    dottie.set(APP, 'domain.project.ProjectModel', {});
    dottie.set(APP, 'domain.security.user.UserModel', {});

    USER = {
      email: 'thiagogarbazza@gmail.com',
      id: '36726e94-fbd2-4152-a0ac-92ac494ce65a',
      name: 'Thiago Garbazza',
      password: 'swordfish'
    };

    projectService = new ProjectService(APP);
  });

  it('should be defined', () => {
    expect(projectService).to.not.be.undefined;
  });

  describe('# create', () => {
    beforeEach(() => {
      delete PROJECT.id;
    });

    it('create a new valid project', done => {
      APP.domain.project.ProjectModel.create = simpleMock.stub().resolveWith(PROJECT);

      projectService.create(PROJECT, USER)
        .then(result => {
          expect(APP.domain.project.ProjectModel.create.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('create a new invalid project', done => {
      APP.domain.project.ProjectModel.create = simpleMock.stub().resolveWith();

      const anotherProject = clone(PROJECT);
      delete anotherProject.name;

      projectService.create(anotherProject, USER)
        .then(() => done('user should be invalid!'))
        .catch(error => {
          expect(APP.domain.project.ProjectModel.create.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });

  describe('# destroy', () => {
    it('destroy a project', done => {
      APP.domain.project.ProjectModel.destroy = simpleMock.stub().resolveWith();

      projectService.destroy(PROJECT.id)
        .then(() => {
          expect(APP.domain.project.ProjectModel.destroy.callCount).to.equal(1);
          const quering = APP.domain.project.ProjectModel.destroy.lastCall.arg;
          expect(quering.where.id).to.equal(PROJECT.id);
          done();
        })
        .catch(done);
    });
  });

  describe('# find', () => {
    it('search a project by name', done => {
      APP.domain.project.ProjectModel.findAll = simpleMock.stub().resolveWith();
      const filter = {
        name: 'another project'
      };

      projectService.find(filter)
        .then(() => {
          expect(APP.domain.project.ProjectModel.findAll.callCount).to.equal(1);
          const quering = APP.domain.project.ProjectModel.findAll.lastCall.arg;
          expect(quering.where.name).to.deep.equal({
            like: '%another project%'
          });
          done();
        })
        .catch(done);
    });
  });

  describe('# findById', () => {
    it('find project by ID', done => {
      APP.domain.project.ProjectModel.findById = simpleMock.stub().resolveWith();

      projectService.findById(PROJECT.id)
        .then(() => {
          expect(APP.domain.project.ProjectModel.findById.callCount).to.equal(1);
          expect(APP.domain.project.ProjectModel.findById.lastCall.arg).to.equal(PROJECT.id);
          done();
        })
        .catch(done);
    });
  });

  describe('# update', () => {
    it('update a valid client', done => {
      APP.domain.project.ProjectModel.update = simpleMock.stub().resolveWith(PROJECT);

      projectService.update(PROJECT.id, PROJECT, USER)
        .then(result => {
          expect(APP.domain.project.ProjectModel.update.callCount).to.equal(1);
          done();
        })
        .catch(done);
    });

    it('update a invalid client', done => {
      APP.domain.project.ProjectModel.update = simpleMock.stub().resolveWith(PROJECT);

      const anotherProject = clone(PROJECT);
      delete anotherProject.name;

      projectService.update(anotherProject.id, anotherProject, USER)
        .then(() => done('client should be invalid!'))
        .catch(error => {
          expect(APP.domain.project.ProjectModel.update.callCount).to.equal(0);
          expect(error.name).to.equal('BusinessError');
          done();
        });
    });
  });
});
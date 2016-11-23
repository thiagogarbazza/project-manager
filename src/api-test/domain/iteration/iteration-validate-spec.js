'use strict';
const IterationValidate = require('../../../api/domain/iteration/iteration-validate');

const DATA_2010_01_01 = new Date(2010, 0, 1);
const DATA_2013_05_13 = new Date(2013, 4, 13);
const DATA_2013_05_17 = new Date(2013, 4, 17);
const DATA_2013_05_20 = new Date(2013, 4, 20);
const DATA_2013_05_24 = new Date(2013, 4, 24);

describe('api domain iteration validate', () => {
  const APP = {};
  let ITERATION;
  let iterationValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.iteration.IterationModel', {});

    ITERATION = {
      content: 'test, teste,teste',
      end: DATA_2013_05_17,
      id: 'ae8dd17d-20ae-4f52-b53f-e5c58f4708b4',
      name: 'as',
      projectId: 'dfb52b7e-e95e-4a36-905c-ba0a8478f46b',
      start: DATA_2013_05_13
    };

    iterationValidate = new IterationValidate(APP);
  });

  it('should be defined', () => {
    expect(iterationValidate).to.not.be.undefined;
  });

  it('end should be required', done => {
    delete ITERATION.end;

    iterationValidate.endIsRequired(ITERATION)
      .then(result => {
        expect(result.code).to.equal('iteration.end.required');
        expect(result.message).to.equal('End date is required');
        return done();
      })
      .catch(done);
  });

  it('end must be greater than a start.', done => {
    ITERATION.start = DATA_2013_05_13;
    ITERATION.end = DATA_2010_01_01;

    iterationValidate.endMustBeGreaterThanAStart(ITERATION)
      .then(result => {
        expect(result.code).to.equal('iteration.end.must-be-greater-than-a-start');
        expect(result.message).to.equal('End date must be greater than a start date');
        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete ITERATION.name;

    iterationValidate.nameIsRequired(ITERATION)
      .then(result => {
        expect(result.code).to.equal('iteration.name.required');
        expect(result.message).to.equal('Name is required');
        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    ITERATION.name = properties.BIG_TEXT;

    iterationValidate.nameMustHaveMaximum100Characters(ITERATION)
      .then(result => {
        expect(result.code).to.equal('iteration.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 100 characters');
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending a new name', done => {
    const anotherDocument = clone(ITERATION);
    anotherDocument.name = 'Internal';
    APP.domain.iteration.IterationModel.findOne = simpleMock.stub().resolveWith();

    iterationValidate.nameMustBeUnique(anotherDocument)
      .then(() => {
        expect(APP.domain.iteration.IterationModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherDocument = clone(ITERATION);
    APP.domain.iteration.IterationModel.findOne = simpleMock.stub().resolveWith(ITERATION);

    iterationValidate.nameMustBeUnique(anotherDocument)
      .then(result => {
        expect(APP.domain.iteration.IterationModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherDocument = clone(ITERATION);
    anotherDocument.id = '2103c936-6613-4479-975c-cd1a87fe1e41';
    APP.domain.iteration.IterationModel.findOne = simpleMock.stub().resolveWith(ITERATION);

    iterationValidate.nameMustBeUnique(anotherDocument)
      .then(result => {
        expect( APP.domain.iteration.IterationModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('iteration.name.unique');
        expect(result.message).to.equal('Name must be unique');
        return done();
      })
      .catch(done);
  });

  it('project should be required', done => {
    delete ITERATION.projectId;

    iterationValidate.projectIsRequired(ITERATION)
      .then(result => {
        expect(result.code).to.equal('iteration.project.required');
        expect(result.message).to.equal('Project is required');
        return done();
      })
      .catch(done);
  });

  it('start should be required', done => {
    delete ITERATION.start;

    iterationValidate.startIsRequired(ITERATION)
      .then(result => {
        expect(result.code).to.equal('iteration.start.required');
        expect(result.message).to.equal('Start date is required');
        return done();
      })
      .catch(done);
  });

  describe('# onCreate', () => {
    beforeEach(() => {
      delete ITERATION.id;
      APP.domain.iteration.IterationModel.findOne = simpleMock.stub().resolveWith();
    });

    it('create a new valid iteration', done => {
      iterationValidate.onCreate(ITERATION)
        .then(() => done())
        .catch(done);
    });

    it('create a new invalid iteration', done => {
      delete ITERATION.name;
      delete ITERATION.projectId;

       iterationValidate.onCreate(ITERATION)
        .then(() => done('should be error'))
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(2);
          expect(error.errors[0].code).to.equal('iteration.name.required');
          expect(error.errors[1].code).to.equal('iteration.project.required');
          return done();
        });
    });
  });

  describe('# onUpdate', () => {
    beforeEach(() => {
       APP.domain.iteration.IterationModel.findOne = simpleMock.stub().resolveWith();
    });

    it('update a valid iteration', done => {
      iterationValidate.onUpdate(ITERATION)
        .then(() => done())
        .catch(error => done(error));
    });

    it('update a invalid iteration', done => {
      delete ITERATION.name;
      delete ITERATION.projectId;

      iterationValidate.onUpdate(ITERATION)
        .then(() => done())
        .catch(error => {
          expect(error.name).to.equal('BusinessError');
          expect(error.errors.length).to.equal(2);
          expect(error.errors[0].code).to.equal('iteration.name.required');
          expect(error.errors[1].code).to.equal('iteration.project.required');
          return done();
        });
    });
  });
});

'use strict';

const WorkItemSeverityValidate = require('../../../../api/domain/work-item/severity/work-item-severity-validate');

describe('api domain work-item severity validate', () => {
  const APP = {};
  let WORK_ITEM_SEVERITY;
  let workItemSeverityValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.workItem.severity.WorkItemSeverityModel', {});

    WORK_ITEM_SEVERITY = {
      color: 'red',
      description: 'Blocks development and/or testing work, production could not run.',
      icon: 'fa fa-ban',
      id: '1e94ec5e-bc30-42db-9116-e11429dac792',
      name: 'Blocker',
      order: 1,
      projectId: '43cf39a6-f1a8-48fe-a76b-ee042cb2ea9a'
    };

    workItemSeverityValidate = new WorkItemSeverityValidate(APP);
  });

  it('should be defined', () => {
    expect(workItemSeverityValidate).to.not.be.undefined;
  });

  it('color shold be valid', done => {
    WORK_ITEM_SEVERITY.color = properties.INVALID_COLOR;

    workItemSeverityValidate.colorMustBeValid(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.color.iscolor');
        expect(result.message).to.equal('Color must be valid');
        return done();
      })
      .catch(done);
  });

  it('color should be maximum 30 characters', done => {
    WORK_ITEM_SEVERITY.color = properties.BIG_TEXT;

    workItemSeverityValidate.colorMustHaveMaximum30Characters(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.color.maxlength');
        expect(result.message).to.equal('Color must have a maximum of 30 characters');
        return done();
      })
      .catch(done);
  });

  it('description should be maximum 500 characters', done => {
    WORK_ITEM_SEVERITY.description = properties.BIG_TEXT;

    workItemSeverityValidate.descriptionMustHaveMaximum500Characters(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.description.maxlength');
        expect(result.message).to.equal('Description must have a maximum of 500 characters');
        return done();
      })
      .catch(done);
  });

  it('icon should be maximum 20 characters', done => {
    WORK_ITEM_SEVERITY.icon = properties.BIG_TEXT;

    workItemSeverityValidate.iconMustHaveMaximum20Characters(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.icon.maxlength');
        expect(result.message).to.equal('Icon must have a maximum of 20 characters');
        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete WORK_ITEM_SEVERITY.name;

    workItemSeverityValidate.nameIsRequired(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.name.required');
        expect(result.message).to.equal('Name is required');
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending a new name', done => {
    const anotherWorkItemSeverity = clone(WORK_ITEM_SEVERITY);
    anotherWorkItemSeverity.name = 'Cosmetic';
    APP.domain.workItem.severity.WorkItemSeverityModel.findOne = simpleMock.stub().resolveWith();

    workItemSeverityValidate.nameMustBeUnique(anotherWorkItemSeverity)
      .then(() => {
        expect(APP.domain.workItem.severity.WorkItemSeverityModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherWorkItemSeverity = clone(WORK_ITEM_SEVERITY);
    APP.domain.workItem.severity.WorkItemSeverityModel.findOne = simpleMock.stub().resolveWith(WORK_ITEM_SEVERITY);

    workItemSeverityValidate.nameMustBeUnique(anotherWorkItemSeverity)
      .then(result => {
        expect(APP.domain.workItem.severity.WorkItemSeverityModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherWorkItemSeverity = clone(WORK_ITEM_SEVERITY);
    anotherWorkItemSeverity.id = '74434ff8-b210-4e71-9728-159180beef8e';
    APP.domain.workItem.severity.WorkItemSeverityModel.findOne = simpleMock.stub().resolveWith(WORK_ITEM_SEVERITY);

    workItemSeverityValidate.nameMustBeUnique(anotherWorkItemSeverity)
      .then(result => {
        expect( APP.domain.workItem.severity.WorkItemSeverityModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('workItemSeverity.name.unique');
        expect(result.message).to.equal('Name must be unique');
        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    WORK_ITEM_SEVERITY.name = properties.BIG_TEXT;

    workItemSeverityValidate.nameMustHaveMaximum50Characters(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 50 characters');
        return done();
      })
      .catch(done);
  });

  it('project should be required', done => {
    delete WORK_ITEM_SEVERITY.projectId;

    workItemSeverityValidate.projectIsRequired(WORK_ITEM_SEVERITY)
      .then(result => {
        expect(result.code).to.equal('workItemSeverity.project.required');
        expect(result.message).to.equal('Project is required');
        return done();
      })
      .catch(done);
  });
});

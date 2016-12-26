'use strict';

const WorkItemPriorityValidate = require('../../../../api/domain/work-item/priority/work-item-priority-validate');

describe('api domain work-item priority validate', () => {
  const APP = {};
  let WORK_ITEM_PRIORITY;
  let workItemPriorityValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.workItem.priority.WorkItemPriorityModel', {});

    WORK_ITEM_PRIORITY = {
      color: 'red',
      description: 'Blocks development and/or testing work, production could not run.',
      icon: 'fa fa-ban',
      id: '1e94ec5e-bc30-42db-9116-e11429dac792',
      name: 'Blocker',
      order: 1,
      projectId: '43cf39a6-f1a8-48fe-a76b-ee042cb2ea9a'
    };

    workItemPriorityValidate = new WorkItemPriorityValidate(APP);
  });

  it('should be defined', () => {
    expect(workItemPriorityValidate).to.not.be.undefined;
  });

  it('color shold be valid', done => {
    WORK_ITEM_PRIORITY.color = properties.INVALID_COLOR;

    workItemPriorityValidate.colorMustBeValid(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.color.iscolor');
        expect(result.message).to.equal('Color must be valid');
        return done();
      })
      .catch(done);
  });

  it('color should be maximum 30 characters', done => {
    WORK_ITEM_PRIORITY.color = properties.BIG_TEXT;

    workItemPriorityValidate.colorMustHaveMaximum30Characters(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.color.maxlength');
        expect(result.message).to.equal('Color must have a maximum of 30 characters');
        return done();
      })
      .catch(done);
  });

  it('description should be maximum 500 characters', done => {
    WORK_ITEM_PRIORITY.description = properties.BIG_TEXT;

    workItemPriorityValidate.descriptionMustHaveMaximum500Characters(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.description.maxlength');
        expect(result.message).to.equal('Description must have a maximum of 500 characters');
        return done();
      })
      .catch(done);
  });

  it('icon should be maximum 20 characters', done => {
    WORK_ITEM_PRIORITY.icon = properties.BIG_TEXT;

    workItemPriorityValidate.iconMustHaveMaximum20Characters(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.icon.maxlength');
        expect(result.message).to.equal('Icon must have a maximum of 20 characters');
        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete WORK_ITEM_PRIORITY.name;

    workItemPriorityValidate.nameIsRequired(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.name.required');
        expect(result.message).to.equal('Name is required');
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending a new name', done => {
    const anotherWorkItemPriority = clone(WORK_ITEM_PRIORITY);
    anotherWorkItemPriority.name = 'Cosmetic';
    APP.domain.workItem.priority.WorkItemPriorityModel.findOne = simpleMock.stub().resolveWith();

    workItemPriorityValidate.nameMustBeUnique(anotherWorkItemPriority)
      .then(() => {
        expect(APP.domain.workItem.priority.WorkItemPriorityModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherWorkItemPriority = clone(WORK_ITEM_PRIORITY);
    APP.domain.workItem.priority.WorkItemPriorityModel.findOne = simpleMock.stub().resolveWith(WORK_ITEM_PRIORITY);

    workItemPriorityValidate.nameMustBeUnique(anotherWorkItemPriority)
      .then(result => {
        expect(APP.domain.workItem.priority.WorkItemPriorityModel.findOne.callCount).to.equal(1);
        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherWorkItemPriority = clone(WORK_ITEM_PRIORITY);
    anotherWorkItemPriority.id = '74434ff8-b210-4e71-9728-159180beef8e';
    APP.domain.workItem.priority.WorkItemPriorityModel.findOne = simpleMock.stub().resolveWith(WORK_ITEM_PRIORITY);

    workItemPriorityValidate.nameMustBeUnique(anotherWorkItemPriority)
      .then(result => {
        expect( APP.domain.workItem.priority.WorkItemPriorityModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('workItemPriority.name.unique');
        expect(result.message).to.equal('Name must be unique');
        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    WORK_ITEM_PRIORITY.name = properties.BIG_TEXT;

    workItemPriorityValidate.nameMustHaveMaximum50Characters(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 50 characters');
        return done();
      })
      .catch(done);
  });

  it('project should be required', done => {
    delete WORK_ITEM_PRIORITY.projectId;

    workItemPriorityValidate.projectIsRequired(WORK_ITEM_PRIORITY)
      .then(result => {
        expect(result.code).to.equal('workItemPriority.project.required');
        expect(result.message).to.equal('Project is required');
        return done();
      })
      .catch(done);
  });
});

'use strict';

const WorkItemTypeValidate = require('../../../../api/domain/work-item/type/work-item-type-validate');

describe('api domain work-item type validate', () => {
  const APP = {};
  let WORK_ITEM_TYPE;
  let workItemTypeValidate;

  beforeEach(() => {
    dottie.set(APP, 'domain.workItem.type.WorkItemTypeModel', {});

    WORK_ITEM_TYPE = {
      color: 'rgb(237, 78, 42)',
      description: '',
      icon: 'fa fa-ban',
      id: 'fb97b936-2dc6-4f98-859d-43a8a75917a4',
      name: 'Bug'
    };

    workItemTypeValidate = new WorkItemTypeValidate(APP);
  });

  it('should be defined', () => {
    expect(workItemTypeValidate).to.not.be.undefined;
  });

  it('color shold be valid', done => {
    WORK_ITEM_TYPE.color = properties.INVALID_COLOR;

    workItemTypeValidate.colorMustBeValid(WORK_ITEM_TYPE)
      .then(result => {
        expect(result.code).to.equal('workItemType.color.iscolor');
        expect(result.message).to.equal('Color must be valid');

        return done();
      })
      .catch(done);
  });

  it('color should be maximum 30 characters', done => {
    WORK_ITEM_TYPE.color = properties.BIG_TEXT;

    workItemTypeValidate.colorMustHaveMaximum30Characters(WORK_ITEM_TYPE)
      .then(result => {
        expect(result.code).to.equal('workItemType.color.maxlength');
        expect(result.message).to.equal('Color must have a maximum of 30 characters');

        return done();
      })
      .catch(done);
  });

  it('description should be maximum 500 characters', done => {
    WORK_ITEM_TYPE.description = properties.BIG_TEXT;

    workItemTypeValidate.descriptionMustHaveMaximum500Characters(WORK_ITEM_TYPE)
      .then(result => {
        expect(result.code).to.equal('workItemType.description.maxlength');
        expect(result.message).to.equal('Description must have a maximum of 500 characters');

        return done();
      })
      .catch(done);
  });

  it('icon should be maximum 20 characters', done => {
    WORK_ITEM_TYPE.icon = properties.BIG_TEXT;

    workItemTypeValidate.iconMustHaveMaximum20Characters(WORK_ITEM_TYPE)
      .then(result => {
        expect(result.code).to.equal('workItemType.icon.maxlength');
        expect(result.message).to.equal('Icon must have a maximum of 20 characters');

        return done();
      })
      .catch(done);
  });

  it('name should be required', done => {
    delete WORK_ITEM_TYPE.name;

    workItemTypeValidate.nameIsRequired(WORK_ITEM_TYPE)
      .then(result => {
        expect(result.code).to.equal('workItemType.name.required');
        expect(result.message).to.equal('Name is required');

        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending a new name', done => {
    const anotherWorkItemType = clone(WORK_ITEM_TYPE);

    anotherWorkItemType.name = 'Story';
    APP.domain.workItem.type.WorkItemTypeModel.findOne = simpleMock.stub().resolveWith();

    workItemTypeValidate.nameMustBeUnique(anotherWorkItemType)
      .then(() => {
        expect(APP.domain.workItem.type.WorkItemTypeModel.findOne.callCount).to.equal(1);

        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with equal ID', done => {
    const anotherWorkItemType = clone(WORK_ITEM_TYPE);

    APP.domain.workItem.type.WorkItemTypeModel.findOne = simpleMock.stub().resolveWith(WORK_ITEM_TYPE);

    workItemTypeValidate.nameMustBeUnique(anotherWorkItemType)
      .then(() => {
        expect(APP.domain.workItem.type.WorkItemTypeModel.findOne.callCount).to.equal(1);

        return done();
      })
      .catch(done);
  });

  it('name should be unique, Sending same name with different ID´s', done => {
    const anotherWorkItemType = clone(WORK_ITEM_TYPE);

    anotherWorkItemType.id = '88262268-fca9-4b17-ba6d-ce8eedf849a8';
    APP.domain.workItem.type.WorkItemTypeModel.findOne = simpleMock.stub().resolveWith(WORK_ITEM_TYPE);

    workItemTypeValidate.nameMustBeUnique(anotherWorkItemType)
      .then(result => {
        expect(APP.domain.workItem.type.WorkItemTypeModel.findOne.callCount).to.equal(1);
        expect(result.code).to.equal('workItemType.name.unique');
        expect(result.message).to.equal('Name must be unique');

        return done();
      })
      .catch(done);
  });

  it('name should be maximum 100 characters', done => {
    WORK_ITEM_TYPE.name = properties.BIG_TEXT;

    workItemTypeValidate.nameMustHaveMaximum50Characters(WORK_ITEM_TYPE)
      .then(result => {
        expect(result.code).to.equal('workItemType.name.maxlength');
        expect(result.message).to.equal('Name must have a maximum of 50 characters');

        return done();
      })
      .catch(done);
  });
});

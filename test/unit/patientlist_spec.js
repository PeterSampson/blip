var expect = chai.expect;
var _ = window._;
var helpers = require('../lib/unithelpers');

var PatientList = require('../../app/components/patientlist');
var demoPatients = require('../../demo/sample/patients.json');

describe('PatientList', function() {
  var component;

  beforeEach(function() {
    component = PatientList();
    helpers.mountComponent(component);
  });

  afterEach(function() {
    helpers.unmountComponent();
  });

  it('should render empty list', function() {
    var patients = null;

    component.setProps({patients: patients});
    var count = component.getDOMNode().children.length;

    expect(count).to.equal(0);
  });

  it('should render patient list items', function() {
    var patients = demoPatients;

    component.setProps({patients: patients});
    var count = component.getDOMNode().children.length;

    expect(count).to.equal(patients.length);
  });

  it('should render empty list items', function() {
    var patients = [{}, {}];

    component.setProps({patients: patients});
    var count = component.getDOMNode().children.length;
    var listItem = component.getDOMNode().children[0];

    expect(count).to.equal(patients.length);
    expect(listItem.className).to.contain('patient-list-item-empty');
  });
});
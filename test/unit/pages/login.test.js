/* global chai */
/* global describe */
/* global sinon */
/* global it */

window.config = {};

import React from'react';
import TestUtils from'react-addons-test-utils';

import { Login } from'../../../app/pages/login/login.js';
import { mapStateToProps } from'../../../app/pages/login/login.js';

let assert = chai.assert;
let expect = chai.expect;

describe('Login', function () {
  it('should be exposed as a module and be of type function', function() {
    expect(Login).to.be.a('function');
  });

  describe('render', function() {
    it('should render without problems when required props are present', function () {
      console.error = sinon.stub();
      var props = {
        trackMetric: sinon.stub(),
        onSubmit: sinon.stub(),
        working: false,
      };
      var elem = React.createElement(Login, props);
      var render = TestUtils.renderIntoDocument(elem);
      expect(console.error.callCount).to.equal(0);
    });

    it('should console.error when required props are missing', function () {
      console.error = sinon.stub();
      var elem = TestUtils.renderIntoDocument(<Login />);
      expect(console.error.callCount).to.equal(3);
      expect(console.error.calledWith('Warning: Failed propType: Required prop `working` was not specified in `Login`.')).to.equal(true);
      expect(console.error.calledWith('Warning: Failed propType: Required prop `onSubmit` was not specified in `Login`.')).to.equal(true);
      expect(console.error.calledWith('Warning: Failed propType: Required prop `trackMetric` was not specified in `Login`.')).to.equal(true);
    });
  });

  describe('mapStateToProps', () => {
    const state = {
      working: {
        loggingIn: {inProgress: false, notification: null}
      }
    };
    const result = mapStateToProps({blip: state});
    it('should be a function', () => {
      assert.isFunction(mapStateToProps);
    });

    it('should map working.loggingIn.inProgress to working', () => {
      expect(result.working).to.equal(state.working.loggingIn.inProgress);
    });

    it('should map working.loggingIn.notification to notification', () => {
      expect(result.notification).to.equal(state.working.loggingIn.notification);
    });
  });
});

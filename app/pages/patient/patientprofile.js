import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions';

import _ from 'lodash';

import Patient from './patient';

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
let getFetchers = (dispatchProps, ownProps, api) => {
  return [
    dispatchProps.fetchPatient.bind(null, api, ownProps.routeParams.id)
  ];
};

let mapStateToProps = state => {
  let user = null;
  let patient = null;

  let { 
    allUsersMap, 
    loggedInUserId, 
    currentPatientInViewId,
  } = state.blip;

  if (allUsersMap){
    if (loggedInUserId) {
      user = allUsersMap[loggedInUserId];
    }

    if (currentPatientInViewId){
      patient = allUsersMap[currentPatientInViewId];
    }
  }

  return {
    user: user,
    fetchingUser: state.blip.working.fetchingUser.inProgress,
    patient: patient,
    fetchingPatient: state.blip.working.fetchingPatient.inProgress,
    pendingSentInvites: state.blip.pendingSentInvites,
    changingMemberPermissions: state.blip.working.settingMemberPermissions,
    removingMember: state.blip.working.removingMember,
    invitingMember: state.blip.working.sendingInvite,
    cancellingInvite: state.blip.working.cancellingSentInvite
  };
};

let mapDispatchToProps = dispatch => bindActionCreators({
  fetchPatient: actions.async.fetchPatient,
  updatePatient: actions.async.updatePatient,
  changeMemberPermissions: actions.async.setMemberPermissions,
  removeMember: actions.async.removeMember,
  inviteMember: actions.async.sendInvite,
  cancelInvite: actions.async.cancelSentInvite
}, dispatch);

let mergeProps = (stateProps, dispatchProps, ownProps) => {
  var api = ownProps.routes[0].api;
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    fetchers: getFetchers(dispatchProps, ownProps, api),
    onUpdatePatient: dispatchProps.updatePatient.bind(null, api),
    onChangeMemberPermissions: dispatchProps.changeMemberPermissions.bind(null, api),
    onRemoveMember: dispatchProps.removeMember.bind(null, api),
    onInviteMember: dispatchProps.inviteMember.bind(null, api),
    onCancelInvite: dispatchProps.cancelInvite.bind(null, api),
    trackMetric: ownProps.routes[0].trackMetric,
    shareOnly: false
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Patient);
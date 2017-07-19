import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import UI from './UI'
import {Provider} from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import {createLogger,logger} from 'redux-logger'

// GitHub API
const gitHubApi = () => {
  return fetch('https://gist.githubusercontent.com/bgdavidx/9458ff3ae6054a28e0a636367ff77bbf/raw/990adb44389595174da8fc5ec890045e0db66495/gistfile1.txt')
    .then(response => response.json())
    .catch(error => {
      throw error;
    })
};

// Reducer
const Reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return action.details;
    default:
      return state;
  }
};

// Sagas
const loadUserDetails = function* loadUserDetails() {
  try {
    const details = yield call(gitHubApi);
    yield put({type: 'LOAD_SUCCESS', details});
  } catch (error) {
    console.error(error)
  }
}

const watchRequest = function* watchRequest() {
  yield takeLatest('LOAD_USER_DETAILS', loadUserDetails);
}

export default class TruckerRadio extends Component {
  render() {
    return (
      <Provider store={store}>
        <UI />
      </Provider>
    );
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducer, applyMiddleware(sagaMiddleware,createLogger({collapsed:true})));
sagaMiddleware.run(watchRequest)

AppRegistry.registerComponent('TruckerRadio', () => TruckerRadio);

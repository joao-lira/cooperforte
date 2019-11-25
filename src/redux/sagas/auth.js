import { put, call } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import ActionCreators from '../actionCreators'
import md5 from 'md5'
import { STORAGE_TOKEN, STORAGE_USER } from '../../constants/constants'

export const login = ({ api }) =>
  function*(action) {
    const login = yield call(api.login, {
      username: action.username,
      password: action.password
    })

    let token = sessionStorage.getItem(STORAGE_TOKEN)

    if (login.data.success === true && login.data.data.token !== null) {
      token = login.data.data.token
      sessionStorage.setItem(STORAGE_TOKEN, token)

      const user = jwtDecode(token)

      sessionStorage.setItem(STORAGE_USER, JSON.stringify(user.response))
      yield put(ActionCreators.signinSuccess(user.response))
    } else {
      console.log('erro: ', login.data.message)
      yield put(ActionCreators.signinFailure(login.data.message))
    }
  }

export function* auth() {
  const token = sessionStorage.getItem(STORAGE_TOKEN)
  if (token) {
    try {
      const user = jwtDecode(token)
      yield put(ActionCreators.authSuccess(user.response))
    } catch (err) {
      yield put(ActionCreators.authFailure('invalid token'))
    }
  } else {
    yield put(ActionCreators.authFailure('no token'))
  }
}

export function* getUser() {
  const user = sessionStorage.getItem(STORAGE_USER)
  return user
}

export function* destroyAuth() {
  sessionStorage.removeItem(STORAGE_TOKEN)
  sessionStorage.removeItem(STORAGE_USER)
  yield put(ActionCreators.destroyAuthSuccess())
}

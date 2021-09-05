// API
import $axios from 'axios'

export function setAxiosHeader({ state }, accessToken) {
  $axios.defaults.headers.Authorization = 'Bearer ' + accessToken
}

export function requestInfo({ state }, accessToken) {
  const url = '/users/me';
  $axios.defaults.headers.Authorization = 'Bearer ' + accessToken
  return $axios.get(url);
}

export function requestLogin({ state }, payload) {
  console.log('requestLogin', state, payload)
  const url = '/auth/login'
  let body = payload;
  return $axios.post(url, body)
  // return {
  //   data: {
  //     accessToken: "token"
  //   }
  // };
}

export function requestLogout({ state }) {
  delete localStorage.accessToken;
  delete $axios.defaults.headers.Authorization;
}

export function requestCheckUserId({ state }, payload) {
  const url = '/users/' + payload.id
  let body = payload
  // return $axios.get(url, body) 불가능
  return {
    data: {
      statusCode: 200
    }
  };
}

export function requestRegister({ state }, payload) {
  const url = '/users'
  let body = payload
  // return $axios.post(url, body) 불가능
  return {
    data: {
      statusCode: 200
    }
  }
}

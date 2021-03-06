import axios from 'axios'

export const loginUserService = credentials => {
  const LOGIN_API_ENDPOINT = `/token-auth/jwt/create/`

  return axios.post(LOGIN_API_ENDPOINT, credentials)
}

export const singUpUserService = credentials => {
  const SINGUP_API_ENDPOINT = `/auth/users/`

  return axios.post(SINGUP_API_ENDPOINT, credentials)
}

export const refreshTokenService = refreshToken => {
  const REFRESH_TOKEN_API_ENDPOINT = `/token-auth/jwt/refresh/`
  const data = {
    refresh: refreshToken
  }

  return axios.post(REFRESH_TOKEN_API_ENDPOINT, data)
}

export const getAuthHeaders = () => {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) {
    return null
  }
  return {
    'Authorization': `JWT ${access_token}`
  }
}

let URL_API = ''

if (process.env.NODE_ENV === 'production') {
  URL_API = 'https://cooperfort-api.obra.art.br/'
} else if (process.env.NODE_ENV === 'development') {
  URL_API = 'http://localhost:3000/'
} else if (process.env.NODE_ENV === 'test') {
  URL_API = 'http://localhost:3000/'
}

export const STORAGE_TOKEN = 'token'
export const STORAGE_USER = 'user'

// LOGIN
export const PATH_ROUTER_LOGIN = '/authentication/login'
export const PATH_ROUTER_REGISTER = '/authentication/register'
export const PATH_ROUTER_RECOVER_PASSWORD = '/authentication/recover-password'
export const PATH_ROUTER_PAGE_DEFAULT = '/clients'
export const PATH_BASE_URL_API = URL_API
export const PATH_BASE_URL_API_VIA_CEP = 'https://viacep.com.br/ws/'

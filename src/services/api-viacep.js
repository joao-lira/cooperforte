import { PATH_BASE_URL_API_VIA_CEP } from '../constants/constants'
import axios from 'axios'

const apiViaCep = axios.create({
  baseURL: PATH_BASE_URL_API_VIA_CEP
})

export default apiViaCep

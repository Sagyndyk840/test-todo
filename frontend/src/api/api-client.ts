import axios from 'axios'
import {toast} from 'vue3-toastify';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred'

    toast.error(errorMessage, {
      position: 'top-right',
      closeOnClick: true,
    })

    return Promise.reject(error)
  }
)

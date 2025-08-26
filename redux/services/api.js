import { getToken } from '@/components/utils'
import { apibasePath } from '@/config'
import axios from 'axios'

const token = getToken()

// export const apiRequest = axios.create({
//     baseURL: apibasePath,
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//     }
// })

export const apiRequest = axios.create({
    baseURL: apibasePath,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    },
});
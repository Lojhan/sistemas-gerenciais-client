import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://192.168.15.5:3000'
})

export const axiosVending = axios.create({
    baseURL: 'http://192.168.15.5:3001'
})

export const axiosPayment = axios.create({
    baseURL: 'http://192.168.15.5:3002'
})
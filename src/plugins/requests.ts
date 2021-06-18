import { AuthCredentialsDto } from '@/classes/auth-credentials.dto'
import { axiosInstance, axiosVending, axiosPayment } from './axios'
import { TOKEN } from './constants'

export default {
    signUp: (authCredentialsDto: AuthCredentialsDto) => axiosInstance.post('auth/signup', authCredentialsDto.createObject()),

    signIn: (username: string, password: string) => axiosInstance.post('auth/signin', { username, password, type: 'user' }),

    products: () => axiosInstance.get('products'),

    product: (id: string) => axiosInstance.get('products/' + id),

    purchases: () => axiosVending.get('sales'),

    purchase: (id: string) => axiosVending.get('sales/' + id),

    productsRaw: () => axiosInstance.get('products/raw'),

    buy: (cart: any[]) => axiosVending.post(`sales`, cart, { headers: { Authorization: `Bearer ${TOKEN}` }}),

    pay: (paymentData: any) => axiosPayment.post(`cards`, paymentData),

    insertTicket: (data: any) => axiosPayment.post(`payment-ticket`, data),

    getTicket: (uuid: string) => axiosPayment.get(`payment-ticket/ticket/` + uuid),
    
    useMontlyTickets: (data: any) => axiosPayment.post(`montly-payment-ticket`, data),
}
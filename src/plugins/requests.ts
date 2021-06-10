import { AuthCredentialsDto } from '@/classes/auth-credentials.dto'
import { axiosInstance, axiosVending } from './axios'
import { TOKEN } from './constants'

export default {
    signUp: (authCredentialsDto: AuthCredentialsDto) => axiosInstance.post('auth/signup', authCredentialsDto.createObject()),

    signIn: (username: string, password: string) => axiosInstance.post('auth/signin', { username, password, type: 'user' }),

    products: () => axiosInstance.get('products'),

    product: (id: string) => axiosInstance.get('products/' + id),

    productsRaw: () => axiosInstance.get('products/raw'),

    buy: (cart: any[]) => axiosVending.post(`sales`, cart, { headers: { Authorization: `Bearer ${TOKEN}` }})
}
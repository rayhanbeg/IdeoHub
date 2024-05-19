import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'https://ideohub.vercel.app', withCredentials:true
})
const useAxiosSecure = () => {
    const {logOut} = useAuth()
    const navigate = useNavigate()
    // interceptor

    // response interceptor
    axios.interceptors.response.use((res) =>{
        return res
    },
   async error => {
        console.log('error.from axios interceptor', error.response)
        if(error.response.status ===  401 || error.response.status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    }
);

    
    
    // axios.interceptors.request

    return axiosSecure
};

export default useAxiosSecure;
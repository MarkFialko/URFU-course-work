import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://urfu-course-work.onrender.com/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// @ts-ignore
axiosInstance.interceptors.request.use((config)=> {
    console.log(config,'config')
    return config
})
export default axiosInstance

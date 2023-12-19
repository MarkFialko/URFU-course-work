import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://urfu-course-work.onrender.com/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance

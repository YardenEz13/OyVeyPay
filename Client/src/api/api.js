import axios from 'axios'

const baseURL =
process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:1312/api'
export default axios.create({
    baseURL: baseURL,
    headers:{
        'Content-type':'application/json'
    },
    withCredentials:true,
    
    
})
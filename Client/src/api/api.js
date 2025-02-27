import axios from 'axios'

export default axios.create({
    baseURL:'http://localhost:1312/api',
    headers:{
        'Content-type':'application/json'
    },
    withCredentials:true
    
})
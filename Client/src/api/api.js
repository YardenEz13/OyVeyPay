import axios from 'axios'
const baseURL = process.env.NODE_ENV === 'production' ? 'https://oyveypay.onrender.com/api' : 'http://localhost:1312/api';
export default axios.create({
    baseURL,
    headers:{
        'Content-type':'application/json'
    },
    withCredentials:true
    
})
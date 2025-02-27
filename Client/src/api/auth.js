import api from './api'

export const signIn =async (payload)=>{
    try {
        const {data} = await api.post('/sign-in', payload);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while logging in. Please try again.';
        throw new Error(message);   
    }
}

export const signup =async (payload)=>{
    try {
        const {data} = await api.post('/sign-up', payload);
        return data;
    } catch (error) {
        console.error('Signup error:', error.response?.data);
        const message = error.response?.data?.message || 'An error occurred while signing up. Please try again.';
        throw new Error(message);
    }
}

export const logout =async ()=>{
    try {
        const {data} = await api.post('/log-out');
        return data;

    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while logging out. Please try again.';
        throw new Error(message);   
    }
}
export const me =async ()=>{
    try {
        const {data} = await api.get('/me');
        return data;
        
    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while fetching user data. Please try again.';
        throw new Error(message);   
    }
}
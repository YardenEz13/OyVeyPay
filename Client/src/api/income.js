import api from './api'

export const createIncome = async (payload) => {
    try {
        const { userId, ...incomeData } = payload;
        const { data } = await api.post(`/add-income/${userId}`, incomeData);
        return data;


    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while creating the income. Please try again.';
        throw new Error(message);
    } 
}

export const getIncomes = async (userId) => {
    try {
        const { data } = await api.get(`/get-incomes/${userId}`);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while fetching incomes. Please try again.';
        throw new Error(message);
    }
}
export const deleteIncome = async (userId, incomeId) => {
    try {
        const { data } = await api.delete(`/delete-income/${userId}/${incomeId}`);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || 'An error occurred while deleting the income. Please try again.';
        throw new Error(message);
    }
}
export const updateIncome = async (userId, incomeId, payload) => {
    try {
        const { data } = await api.patch(`/update-income/${userId}/${incomeId}`, payload);
        return data;
    } catch (error) {   
        const message = error.response?.data?.message || 'An error occurred while updating the income. Please try again.';
        throw new Error(message);
    }
} 
export const calculateTotalIncomes = async (userId) => {
    try {
        const { data } = await api.get(`/calculate-total-incomes/${userId}`);
        return data;
    } catch (error) {  
        console.error('Calculate total incomes error:', error.response?.data);
        const message = error.response?.data?.message || 'Failed to calculate total incomes';
        throw new Error(message);
    }
};







        

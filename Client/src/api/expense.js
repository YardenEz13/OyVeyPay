import api from './api'

export const createExpense = async (payload) => {
    try {
        const { data } = await api.post(`/add-expense/${payload.userId}`, payload);
        return data;
    } catch (error) {
        console.error('Create expense error:', error.response?.data);
        const message = error.response?.data?.message || 'Failed to create expense';
        throw new Error(message);
    }
};

export const getExpenses = async (userId) => {
    try {
        const { data } = await api.get(`/get-expenses/${userId}`);
        return data;
    } catch (error) {
        console.error('Get expenses error:', error.response?.data);
        const message = error.response?.data?.message || 'Failed to fetch expenses';
        throw new Error(message);
    }
};

export const deleteExpense = async (userId, expenseId) => {
    try {
        const { data } = await api.delete(`/delete-expense/${userId}/${expenseId}`);
        return data;
    } catch (error) {
        console.error('Delete expense error:', error.response?.data);
        const message = error.response?.data?.message || 'Failed to delete expense';
        throw new Error(message);
    }
};

export const updateExpense = async ( expenseId, payload) => {
    try {
        const { data } = await api.patch(`/update-expense/${payload.userId}/${expenseId}`, payload);
        return data;

    } catch (error) {
        console.error('Update expense error:', error.response?.data);
        const message = error.response?.data?.message || 'Failed to update expense';
        throw new Error(message);
    }

};

export const calculateTotalExpenses = async (userId) => {
    try {
        const { data } = await api.get(`/calculate-total-expenses/${userId}`);
        return data;
    } catch (error) {  
        console.error('Calculate total expenses error:', error.response?.data);
        const message = error.response?.data?.message || 'Failed to calculate total expenses';
        throw new Error(message);
    }
};




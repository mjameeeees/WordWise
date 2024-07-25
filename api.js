// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getWords = async () => {
    try {
        const response = await api.get('/words');
        return response.data;
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
};

export const saveWord = async (wordData) => {
    try {
        await api.post('/words', wordData);
    } catch (error) {
        console.error('Error saving word:', error);
        throw error;
    }
};
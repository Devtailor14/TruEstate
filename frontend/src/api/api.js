import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    paramsSerializer: params => {
        const parts = [];
        Object.keys(params).forEach(key => {
            const val = params[key];
            if (Array.isArray(val)) {
                if (val.length > 0) parts.push(`${key}=${val.join(',')}`);
            } else if (val !== undefined && val !== null && val !== '') {
                parts.push(`${key}=${encodeURIComponent(val)}`);
            }
        });
        return parts.join('&');
    }
});

export const fetchSales = async (params) => {
    const response = await api.get('/sales', { params });
    return response.data;
};

export default api;

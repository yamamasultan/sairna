import api from '../../../api/axios'; 

export const transportCompaniesService = {
    async getTransportCompanies() {
        try {
        const response = await api.get('/companies');
        return response.data;
        } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
        }
    },

    async getCompanyDetails(id) {
        try {
        const response = await api.get(`/companies/${id}`);
        return response.data;
        } catch (error) {
        console.error(`Error fetching company ${id}:`, error);
        throw error;
        }
    },
};
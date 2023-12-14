import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001',
    withCredentials: true,
});

export const getTickets = async () => {
    const response = await api.get('/tickets');
    return response.data;
};

export const getTicket = async (ticketId: string) => {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data;
};

export const resolveTicket = async (ticketId: string) => {
    const response = await api.put(`/tickets/${ticketId}/resolve`);
    return response.data;
};

export const openTicket = async (ticketId: string) => {
    const response = await api.put(`/tickets/${ticketId}/open`);
    return response.data;
};


export const deleteTicket = async (ticketId: string) => {
    const response = await api.delete(`/tickets/${ticketId}`);
    return response.data;
};

export const getMessages = async () => {
    const response = await api.get('/messages');
    return response.data;
};

export const getMessage = async (messageId: string) => {
    const response = await api.get(`/messages/${messageId}`);
    return response.data;
};
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    interests: string[];
    avatar_url?: string;
}

export interface UserUpdate {
    first_name?: string;
    last_name?: string;
    position?: string;
    interests?: string[];
    avatar_url?: string;
}

export const userApi = {
    getCurrentUser: (): Promise<User> =>
        api.get('/users/me').then(response => response.data),

    updateUser: (userData: UserUpdate): Promise<User> =>
        api.put('/users/me', userData).then(response => response.data),

    getRecommendations: (): Promise<User[]> =>
        api.get('/recommendations').then(response => response.data),
};
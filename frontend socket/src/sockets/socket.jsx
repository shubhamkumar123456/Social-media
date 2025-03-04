import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (userId) => {
    socket = io('http://localhost:8080', {
        query: { userId },
        withCredentials: true
    });
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

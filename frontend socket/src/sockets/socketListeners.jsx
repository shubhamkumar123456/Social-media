import { addMessage } from '../features/chatSlice';
import { getSocket } from './socket';
import SOCKET_EVENTS from './socketEvents';

export const setupListeners = (dispatch) => {
    const socket = getSocket();

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (message) => {
        dispatch(addMessage(message));
    });

    socket.on(SOCKET_EVENTS.ONLINE_USERS, (users) => {
        console.log('Online Users:', users);
    });

    socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log('Socket connected:', socket.id);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log('Socket disconnected');
    });
};

import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '../sockets/socket';
import { setupListeners } from '../sockets/socketListeners';
import { useDispatch, useSelector } from 'react-redux';

const useSocket = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);  // Assuming you store logged-in user in auth slice

    useEffect(() => {
        if (user) {
            connectSocket(user._id);
            setupListeners(dispatch);
        }

        return () => {
            disconnectSocket();
        };
    }, [user, dispatch]);
};

export default useSocket;

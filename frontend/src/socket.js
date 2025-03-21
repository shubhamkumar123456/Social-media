import { io } from "socket.io-client";

let url = 'http://localhost:8080';
const socket = io(url, { transports: ['websocket'] });
export default socket;

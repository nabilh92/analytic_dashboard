import {io} from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
    constructor(){
        this.socket = null;
    }

    connect(){
        this.socket = io(SOCKET_URL, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });

        this.socket.on('connect', () =>{
            console.log('Connected to server: ', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socket.on('connection_error', (error) => {
            console.error('Connection error: ', error);
        });

        return this.socket;
    }

    disconnect(){
        if(this.socket){
            this.socket.disconnect();
        }
    }

   on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

export default new SocketService();
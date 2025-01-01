// src/API/websocket.ts
import { io, Socket } from 'socket.io-client';
import { IMessage } from "../type"; // Ensure this path is correct

class WebSocketService {
  private socket: Socket | null = null;

  // Initialize WebSocket connection and return a promise that resolves when connected
  public connect(token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io('http://localhost:3000', { // Use 'http' instead of 'ws'
        path: '/ws',
        transports: ['websocket'],
        auth: {
          token, // If you have authentication
        },
        reconnectionAttempts: 5, // Optional: reconnection settings
        reconnectionDelay: 1000,
      });

      // Handle successful connection
      this.socket.on('connect', () => {
        console.log('WebSocket connected');
        resolve();
      });

      // Handle connection errors
      this.socket.on('connect_error', (err) => {
        console.error('WebSocket connection error:', err);
        reject(err);
      });

      // Optional: Handle reconnection attempts
      this.socket.on('reconnect_attempt', (attempt) => {
        console.log(`WebSocket reconnection attempt ${attempt}`);
      });

      this.socket.on('reconnect_failed', () => {
        console.error('WebSocket reconnection failed');
      });
    });
  }

  // Disconnect WebSocket
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('WebSocket disconnected manually');
    }
  }

  // Send a message
  public sendMessage(message: {
    senderId: string;
    receiverId: string;
    text: string;
  }) {
    if (this.socket) {
      this.socket.emit('sendMessage', message, (ack: any) => {
        if (ack.status !== 'ok') {
          console.error('Message delivery failed:', ack.error);
        }
      });
    } else {
      console.error('Cannot send message, socket is not connected');
    }
  }

  // Request all messages in a conversation
  public getAllMessages(user1Id: string, user2Id: string): Promise<IMessage[]> {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        console.log(`Requesting all messages between ${user1Id} and ${user2Id}`);
        this.socket.emit('getAllMessages', { user1Id, user2Id }, (response: any) => {
          if (response.error) {
            console.error('Error fetching messages:', response.error);
            reject(response.error);
          } else {
            console.log('Received messages:', response.data);
            resolve(response.data);
          }
        });
      } else {
        console.error('Cannot get messages, socket is not connected');
        reject('WebSocket not connected');
      }
    });
  }

  // Listen for new messages
  public onNewMessage(callback: (message: IMessage) => void) {
    if (this.socket) {
      this.socket.on('newMessage', (data: IMessage) => {
        console.log('Received new message:', data);
        callback(data);
      });
    }
  }

  // Listen for updated messages
  public onUpdatedMessage(callback: (message: IMessage) => void) {
    if (this.socket) {
      this.socket.on('updatedMessage', (data: IMessage) => {
        console.log('Received updated message:', data);
        callback(data);
      });
    }
  }

  // Listen for deleted messages
  public onDeletedMessage(callback: (id: string) => void) {
    if (this.socket) {
      this.socket.on('deletedMessage', (data: { id: string }) => {
        console.log('Received deleted message ID:', data.id);
        callback(data.id);
      });
    }
  }

  // Add more event listeners as needed
}

const webSocketService = new WebSocketService();
export default webSocketService;

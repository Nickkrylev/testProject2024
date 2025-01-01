import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { findConversation ,attachmentsFind} from "../../API/ChatList";

interface IUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface IMessage {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
  isOwn: boolean;
  attachments: string[];
}

interface ChatWindowProps {
  user: IUser;
  receiverId: string;
  receiveName: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ user, receiverId, receiveName }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const checkAndAddAttachments = async (messageList: IMessage[]) => {
    try {
      const updatedMessages = await Promise.all(
        messageList.map(async (message) => {
          if (message.attachments.length === 0) {
            const attachmentData = await attachmentsFind(message.id);
            return {
              ...message,
              attachments: attachmentData || [],
            };
          }
          return message;
        })
      );
      setMessages((prev) => {
        const messageMap = new Map(prev.map((msg) => [msg.id, msg]));
        updatedMessages.forEach((msg) => messageMap.set(msg.id, msg));
        return Array.from(messageMap.values());
      });
    } catch (error) {
      console.error("Ошибка при проверке вложений:", error);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket подключен");
    };

    const handleNewMessage = (event) => {
      const data = JSON.parse(event.data);
  
      if (data.type === "newMessage") {
        const newMessage: IMessage = {
          id: data.data.id,
          text: data.data.content,
          timestamp: new Date(data.data.created_at).toLocaleTimeString(),
          senderId: data.data.sender_id,
          isOwn: data.data.sender_id === user.id,
          attachments: data.data.attachments || [],
        };
        setMessages((prev) => [...prev, newMessage]);
        checkAndAddAttachments([newMessage]);
      } else if (data.type === "updateMessage") {
        console.log(data.type+"ok");
        const { id, text } = data.data;
    
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, text } : msg))
        );
      } else if (data.type === "deleteMessage") {
        console.log(data.type+"ok");
        const { id } = data.data;
    
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        
      }
    };
  
    socket.addEventListener("message", handleNewMessage);
    socket.onerror = (error) => {
      console.error("WebSocket ошибка:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket закрыт");
    };

    return () => {
      socket.close();
    };
  }, [user.id]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await findConversation(user.id, receiverId);

        const formattedMessages = data.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString(),
          senderId: msg.sender_id,
          isOwn: msg.sender_id === user.id,
          attachments: msg.attachments || [],
        }));

        setMessages(formattedMessages);
        checkAndAddAttachments(formattedMessages);
      } catch (err) {
        setError("Не удалось загрузить сообщения.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [user.id, receiverId]);

  const handleSendMessage = (messageId: string, text: string, attachmentFiles: File[]) => {
    const newMessage: IMessage = {
      id: messageId,
      text,
      timestamp: new Date().toLocaleTimeString(),
      senderId: user.id,
      isOwn: true,
      attachments: attachmentFiles.map((file) => URL.createObjectURL(file)),
    };

   // setMessages((prev) => [...prev, newMessage]);
  };

  const handleEditMessage = async (messageId: string, newText: string) => {
    try {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, text: newText } : msg))
      );

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: "editMessage",
            data: { id: messageId, text: newText },
          })
        );
      }
    } catch (error) {
      console.error("Ошибка при редактировании сообщения:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: "deleteMessage",
            data: { id: messageId },
          })
        );
      }
    } catch (error) {
      console.error("Ошибка при удалении сообщения:", error);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-white h-screen">
      <ChatHeader receiveName={receiveName} />

      {loading && <p className="p-4 text-gray-500">Загрузка сообщений...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}

      {!loading && !error &&<MessageList
      attachments ={attachments}
  messages={messages}
  onEdit={handleEditMessage}
  onDelete={handleDeleteMessage}
  socketRef={socketRef.current}
/>}
      
      <MessageInput
      attachments={attachments} setAttachments={setAttachments}
        onSend={handleSendMessage}
        userId={user.id}
        receiverId={receiverId}
        socket={socketRef.current}
      />
    </div>
  );
};

export default ChatWindow;

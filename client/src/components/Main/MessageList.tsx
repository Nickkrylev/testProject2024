import React, { useState } from "react";
import MessageItem from "./MessageItem";
import Modal from "../Modal/Modal";

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
  attachments: string[];
}

interface MessageListProps {
  messages: Message[];
  onEdit: (messageId: number, newText: string) => void; 
  onDelete: (messageId: number) => void; 
  socketRef: WebSocket | null; 
}

const MessageList: React.FC<MessageListProps> = ({ messages, onEdit, onDelete, socketRef ,attachments}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);


  const handleLongClick = (message: Message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

 
  const handleCloseModal = () => {
    setSelectedMessage(null);
    setModalOpen(false);
  };

  const handleEdit = () => {
    if (selectedMessage) {
      const newText = prompt("Введите новый текст сообщения", selectedMessage.text);
      if (newText && newText.trim() !== "") {
    
        onEdit(selectedMessage.id, newText.trim());

        if (socketRef && socketRef.readyState === WebSocket.OPEN) {
          socketRef.send(
            JSON.stringify({
              event: "updateMessage",
              data: {
                id: selectedMessage.id,
                text: newText.trim(),
              },
            })
          );
        }
      }
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedMessage) {

      onDelete(selectedMessage.id);
      console.log(socketRef)
 
      if (socketRef && socketRef.readyState === WebSocket.OPEN) {
        socketRef.send(
          JSON.stringify({
            event: "deleteMessage",
            data: {
              id: selectedMessage.id,
            },
          })
        );
      }
    }
    handleCloseModal();
  };
 console.log(attachments,messages)
  return (
    <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          onContextMenu={(e) => {
            e.preventDefault();
            handleLongClick(message);
          }}
        >
          <MessageItem   {...message}  />
        </div>
      ))}
      {isModalOpen && selectedMessage && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h3 className="font-bold mb-4">Выберите действие</h3>
          <p className="text-gray-600 mb-4">{selectedMessage.text}</p>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={handleEdit}
            >
              Изменить
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleDelete}
            >
              Удалить
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Закрыть
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MessageList;

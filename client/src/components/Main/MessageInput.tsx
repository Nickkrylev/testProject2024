import React, { useState } from "react";
import FilePreview from "../Modal/FilePreview";
import { sendMessage, uploadFile } from "../../API/chatList";

interface MessageInputProps {
  onSend: (messageId: string, text: string, attachments: File[]) => void;
  userId: string;
  receiverId: string;
  socket: WebSocket | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, userId, receiverId, socket,attachments, setAttachments}) => {
  const [message, setMessage] = useState("");
 // const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!message && attachments.length === 0) return;

    setLoading(true);

    try {
      if (socket && socket.readyState === WebSocket.OPEN) {

        socket.send(
          JSON.stringify({
            event: "sendMessage",
            data: {
              senderId: userId,
              receiverId,
              text: message,
              attachments: attachments.map((file) => file.name),
            },
          })
        );
      } else {
        console.error("WebSocket не подключен");
      }
      console.log(message)
      // Предположим, у вас уже есть подключение WebSocket
     

      socket.onmessage = async (event) => {
        try {
          // Парсим полученные данные
          const response = JSON.parse(event.data);
          console.log("Получен ответ от WebSocket:", response);
          
          // Проверяем, содержит ли ответ ожидаемые данные
          if (response.type === "newMessage" && response.data) {
            const { id } = response.data; // Извлекаем id из данных ответа
            console.log("Получен ID сообщения:", id);
      
            // Сохраняем ID в переменной и загружаем файлы, если они есть
            if (attachments.length > 0) {
              if (id) {
                try {
                  // Загружаем файлы параллельно с использованием Promise.all
                  await Promise.all(
                    attachments.map((file) => uploadFile(userId, id, file))
                  );
                  console.log("Все файлы успешно загружены.");
                } catch (error) {
                  console.error("Ошибка при загрузке файлов:", error);
                }
              } else {
                console.error("Ошибка: ID сообщения отсутствует.");
              }
            }
          } else {
            console.warn("Неизвестное событие или данные:", response);
          }
        } catch (error) {
          console.error("Ошибка обработки сообщения:", error);
        }
      };
      
      // Вызываем onSend только после успешной отправки
      onSend(Date.now().toString(), message, attachments || []);

      // Сбрасываем состояние
      setMessage("");
      setAttachments([]);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t bg-gray-100">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Напишите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
          📎
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <button
          onClick={handleSend}
          disabled={loading}
          className={`p-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          ➤
        </button>
      </div>
      <FilePreview files={attachments} onRemove={handleRemoveFile} />
    </div>
  );
};

export default MessageInput;

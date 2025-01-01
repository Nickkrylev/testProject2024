// import React, { useState } from "react";
// import FilePreview from "../Modal/FilePreview";
// import { sendMessage, uploadFile } from "../../API/chatList"; // Импорт функций

// interface MessageInputProps {
//   onSend: (messageId: string, text: string, attachments: File[]) => void;

//   userId: string; // ID текущего пользователя
//   receiverId: string; // ID получателя
// }

// const MessageInput: React.FC<MessageInputProps> = ({ onSend, userId, receiverId }) => {
//   const [message, setMessage] = useState("");
//   const [attachments, setAttachments] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setAttachments([...attachments, ...Array.from(e.target.files)]);
//     }
//   };

//   const handleRemoveFile = (index: number) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };

//   const handleSend = async () => {
//     if (!message && attachments.length === 0) return; // Ничего не отправляем, если оба поля пустые
  
//     setLoading(true);
  
//     try {
     
//       const messageData = await sendMessage(userId, receiverId, message);
//       console.log("Message Data:", messageData);
  
    
//       if (attachments.length > 0) {
//         if (messageData && messageData.id) {
//           try {
//             await Promise.all(
//               attachments.map((file) =>
//                 uploadFile(userId, messageData.id, file) 
//               )
//             );
//           } catch (error) {
//             console.error("Ошибка при загрузке файлов:", error);
//           }
//         } else {
//           console.error("Ошибка: messageData или messageData.id отсутствует.");
//         }
//       }
  
//       // Вызываем `onSend` для уведомления родительского компонента
//     onSend(messageData.id, message, attachments || []);
  
//       // Сбрасываем состояние
//       setMessage("");
//       setAttachments([]);
//     } catch (error) {
//       console.error("Ошибка при отправке сообщения:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="p-4 border-t bg-gray-100">
//       <div className="flex items-center space-x-3">
//         <input
//           type="text"
//           placeholder="Напишите сообщение..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <label className="p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
//           📎
//           <input
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>
//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className={`p-2 text-white rounded-md ${
//             loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           ➤
//         </button>
//       </div>
//       <FilePreview files={attachments} onRemove={handleRemoveFile} />
//     </div>
//   );
// };

// export default MessageInput;
import React, { useState } from "react";
import FilePreview from "../Modal/FilePreview";
import { sendMessage, uploadFile } from "../../API/chatList"; // Импорт функций

interface MessageInputProps {
  onSend: (messageId: string, text: string, attachments: File[]) => void;
  userId: string; // ID текущего пользователя
  receiverId: string; // ID получателя
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, userId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
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
    if (!message && attachments.length === 0) return; // Ничего не отправляем, если оба поля пустые

    setLoading(true);

    try {
      const messageData = await sendMessage(userId, receiverId, message);
      console.log("Message Data:", messageData);

      if (attachments.length > 0) {
        if (messageData && messageData.id) {
          try {
            await Promise.all(
              attachments.map((file) =>
                uploadFile(userId, messageData.id, file) 
              )
            );
          } catch (error) {
            console.error("Ошибка при загрузке файлов:", error);
          }
        } else {
          console.error("Ошибка: messageData или messageData.id отсутствует.");
        }
      }

      // Вызываем `onSend` для уведомления родительского компонента
      onSend(messageData.id, message, attachments || []);

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

// // // // // MessageItem.tsx
// // // // import React from "react";
// // // // import { FiFile, FiDownload } from "react-icons/fi"; // Добавлена иконка FiDownload для действия скачивания


// // // // interface MessageItemProps {
// // // //   text: string;
// // // //   timestamp: string;
// // // //   isOwn: boolean;
// // // //   attachments: string[];
// // // //   avatarUrl?: string; // Опциональный пропс для динамических аватаров
// // // // }

// // // // const isImage = (url: string): boolean => {
// // // //   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(url);
// // // // };

// // // // const getFileName = (url: string): string => {
// // // //   try {
// // // //     return decodeURIComponent(url.split("/").pop() || "File");
// // // //   } catch {
// // // //     return "File";
// // // //   }
// // // // };

// // // // // Функция для сокращения названий файлов
// // // // const truncateFileName = (name: string, maxLength: number = 20): string => {
// // // //   if (name.length <= maxLength) return name;
// // // //   return `${name.slice(0, maxLength - 3)}...`;
// // // // };

// // // // const MessageItem: React.FC<MessageItemProps> = ({
// // // //   text,
// // // //   timestamp,
// // // //   isOwn,
// // // //   attachments,
// // // //   avatarUrl,
// // // // }) => {
// // // //   return (
// // // //     <div
// // // //       className={`flex items-start ${
// // // //         isOwn ? "justify-end" : "justify-start"
// // // //       } mb-4`}
// // // //     >
// // // //       {/* Отображение аватара, если сообщение не от текущего пользователя */}
// // // //       {!isOwn && avatarUrl && (
// // // //         <img
// // // //           src={avatarUrl}
// // // //           alt="Avatar"
// // // //           className="w-10 h-10 rounded-full mr-3"
// // // //         />
// // // //       )}
// // // //       {/* Запасной аватар, если avatarUrl не предоставлен */}
// // // //       {!isOwn && !avatarUrl && (
// // // //         <img
// // // //           src="https://via.placeholder.com/40"
// // // //           alt="Default Avatar"
// // // //           className="w-10 h-10 rounded-full mr-3"
// // // //         />
// // // //       )}
// // // //       <div
// // // //         className={`max-w-xs p-3 rounded-lg ${
// // // //           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
// // // //         }`}
// // // //       >
// // // //         <p className="whitespace-pre-wrap">{text}</p>
// // // //         {/* Отображение вложений, если они есть */}
// // // //         {attachments.length > 0 && (
// // // //           <div className="mt-2 space-y-2">
// // // //             {attachments.map((url, index) =>
// // // //               isImage(url) ? (
// // // //                 <img
// // // //                   key={index}
// // // //                   src={url}
// // // //                   alt={`Attachment ${index + 1}`}
// // // //                   className="w-full h-auto rounded-lg"
// // // //                   loading="lazy"
// // // //                   onError={(e) => {
// // // //                     (e.target as HTMLImageElement).src =
// // // //                       "https://via.placeholder.com/150?text=Image+Not+Available";
// // // //                   }}
// // // //                 />
// // // //               ) : (
// // // //                 <div
// // // //                   key={index}
// // // //                   className="flex items-center space-x-2"
// // // //                 >
// // // //                   <FiFile size={20} className="text-gray-600" />
// // // //                   {/* Отображение названия файла без ссылки */}
// // // //                   <span className="flex-1 text-blue-700 truncate">
// // // //                     {truncateFileName(getFileName(url), 20)}
// // // //                   </span>
// // // //                   <FiDownload
// // // //                     size={20}
// // // //                     className="text-gray-600 cursor-pointer"
// // // //                     onClick={() => {
// // // //                       // Инициация скачивания файла
// // // //                       const link = document.createElement("a");
// // // //                       link.href = url;
// // // //                       link.download = getFileName(url);
// // // //                       document.body.appendChild(link);
// // // //                       link.click();
// // // //                       document.body.removeChild(link);
// // // //                     }}
// // // //                   />
// // // //                 </div>
// // // //               )
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //         {/* Отображение отформатированного времени */}
// // // //         <span className="block text-xs text-gray-500 mt-1">
// // // //           {timestamp}
// // // //         </span>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MessageItem;

// // // import React from "react";
// // // import { FiFile, FiDownload } from "react-icons/fi"; // Добавлена иконка FiDownload для действия скачивания

// // // interface Attachment {
// // //   id: string;
// // //   file_name: string;
// // //   file_path: string;
// // //   created_at: string;
// // //   message_id: string;
// // // }

// // // interface MessageItemProps {
// // //   text: string;
// // //   timestamp: string;
// // //   isOwn: boolean;
// // //   attachments: Attachment[];
// // //   avatarUrl?: string; // Опциональный пропс для динамических аватаров
// // // }

// // // const isImage = (fileName: string): boolean => {
// // //   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(fileName);
// // // };

// // // const truncateFileName = (name: string, maxLength: number = 20): string => {
// // //   if (name.length <= maxLength) return name;
// // //   return `${name.slice(0, maxLength - 3)}...`;
// // // };

// // // const MessageItem: React.FC<MessageItemProps> = ({
// // //   text,
// // //   timestamp,
// // //   isOwn,
// // //   attachments,
// // //   avatarUrl,
// // // }) => {
// // //   return (
// // //     <div
// // //       className={`flex items-start ${
// // //         isOwn ? "justify-end" : "justify-start"
// // //       } mb-4`}
// // //     >
// // //       {/* Отображение аватара, если сообщение не от текущего пользователя */}
// // //       {!isOwn && avatarUrl && (
// // //         <img
// // //           src={avatarUrl}
// // //           alt="Avatar"
// // //           className="w-10 h-10 rounded-full mr-3"
// // //         />
// // //       )}
// // //       {/* Запасной аватар, если avatarUrl не предоставлен */}
// // //       {!isOwn && !avatarUrl && (
// // //         <img
// // //           src="https://via.placeholder.com/40"
// // //           alt="Default Avatar"
// // //           className="w-10 h-10 rounded-full mr-3"
// // //         />
// // //       )}
// // //       <div
// // //         className={`max-w-xs p-3 rounded-lg ${
// // //           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
// // //         }`}
// // //       >
// // //         <p className="whitespace-pre-wrap">{text}</p>
// // //         {/* Отображение вложений, если они есть */}
// // //         {attachments.length > 0 && (
// // //           <div className="mt-2 space-y-2">
// // //             {attachments.map((attachment, index) => (
// // //               <div key={attachment.id} className="flex items-center space-x-2">
// // //                 {isImage(attachment.file_name) ? (
// // //                   <img
// // //                     src={`file://localhost:3000/${attachment.file_path}`}
// // //                     alt={attachment.file_name}
// // //                     className="w-full h-auto rounded-lg"
// // //                     loading="lazy"
// // //                     onError={(e) => {
// // //                       (e.target as HTMLImageElement).src =
// // //                         "https://via.placeholder.com/150?text=Image+Not+Available";
// // //                     }}
// // //                   />
// // //                 ) : (
// // //                   <>
// // //                     <FiFile size={20} className="text-gray-600" />
// // //                     <span className="flex-1 text-blue-700 truncate">
// // //                       {truncateFileName(attachment.file_name, 20)}
// // //                     </span>
// // //                     <FiDownload
// // //                       size={20}
// // //                       className="text-gray-600 cursor-pointer"
// // //                       onClick={() => {
// // //                         const link = document.createElement("a");
// // //                         link.href = `http://localhost:3000/${attachment.file_path}`;
// // //                         link.download = attachment.file_name;
// // //                         document.body.appendChild(link);
// // //                         link.click();
// // //                         document.body.removeChild(link);
// // //                       }}
// // //                     />
// // //                   </>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //         {/* Отображение отформатированного времени */}
// // //         <span className="block text-xs text-gray-500 mt-1">
// // //           {timestamp}
// // //         </span>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MessageItem;
// // import React, { useState } from "react";
// // import { FiFile, FiDownload } from "react-icons/fi";
// // import ImagePreviewModal from "../Modal/ImagePreviewModal";
// // import API_BASE_URL from "../../API/config";
// // interface Attachment {
// //   id: string;
// //   file_name: string;
// //   file_path: string;
// //   created_at: string;
// //   message_id: string;
// // }

// // interface MessageItemProps {
// //   text: string;
// //   timestamp: string;
// //   isOwn: boolean;
// //   attachments: Attachment[] | string[];
// //   avatarUrl?: string;
// // }

// // const isImage = (fileName: string): boolean => {
// //   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(fileName);
// // };

// // const truncateFileName = (name: string, maxLength: number = 20): string => {
// //   if (name.length <= maxLength) return name;
// //   return `${name.slice(0, maxLength - 3)}...`;
// // };

// // const MessageItem: React.FC<MessageItemProps> = ({
// //   text,
// //   timestamp,
// //   isOwn,
// //   attachments,
// //   avatarUrl,
// // }) => {
// //   const [isPreviewOpen, setPreviewOpen] = useState(false);
// //   const [previewImage, setPreviewImage] = useState("");
// //   const [previewFileName, setPreviewFileName] = useState("");

// //   const openPreview = (imageSrc: string, fileName: string) => {
// //     setPreviewImage(imageSrc);
// //     setPreviewFileName(fileName);
// //     setPreviewOpen(true);
// //   };

// //   const isOldFormat = (attachments: Attachment[] | string[]): attachments is string[] =>
// //     typeof attachments[0] === "string";

// //   return (
// //     <div
// //       className={`flex items-start ${
// //         isOwn ? "justify-end" : "justify-start"
// //       } mb-4`}
// //     >
// //       {!isOwn && avatarUrl && (
// //         <img
// //           src={avatarUrl}
// //           alt="Avatar"
// //           className="w-10 h-10 rounded-full mr-3"
// //         />
// //       )}
// //       {!isOwn && !avatarUrl && (
// //         <img
// //           src="https://via.placeholder.com/40"
// //           alt="Default Avatar"
// //           className="w-10 h-10 rounded-full mr-3"
// //         />
// //       )}
// //       <div
// //         className={`max-w-xs p-3 rounded-lg ${
// //           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
// //         }`}
// //       >
// //         <p className="whitespace-pre-wrap">{text}</p>
// //         {attachments.length > 0 && (
// //           <div className="mt-2 space-y-2">
// //             {isOldFormat(attachments)
// //               ? attachments.map((url, index) =>
// //                   isImage(url) ? (
// //                     <img
// //                       key={index}
// //                       src={url}
// //                       alt={`Attachment ${index + 1}`}
// //                       className="w-full h-auto rounded-lg cursor-pointer"
// //                       loading="lazy"
// //                       onClick={() => openPreview(url, `image-${index + 1}`)}
// //                     />
// //                   ) : (
// //                     <div key={index} className="flex items-center space-x-2">
// //                       <FiFile size={20} className="text-gray-600" />
// //                       <span className="flex-1 text-blue-700 truncate">
// //                         {truncateFileName(url, 20)}
// //                       </span>
// //                       <FiDownload
// //                         size={20}
// //                         className="text-gray-600 cursor-pointer"
// //                         onClick={() => {
// //                           const link = document.createElement("a");
// //                           link.href = url;
// //                           link.download = url;
// //                           document.body.appendChild(link);
// //                           link.click();
// //                           document.body.removeChild(link);
// //                         }}
// //                       />
// //                     </div>
// //                   )
// //                 )
// //               : attachments.map((attachment, index) => (
// //                   <div key={attachment.id} className="flex items-center space-x-2">
// //                     {isImage(attachment.file_name) ? (
// //                       <img
// //                         src={`http://localhost:3000/${attachment.file_path}`}
// //                         alt={attachment.file_name}
// //                         className="w-full h-auto rounded-lg cursor-pointer"
// //                         loading="lazy"
// //                         onClick={() =>
// //                           openPreview(
// //                             `http://localhost:3000/${attachment.file_path}`,
// //                             attachment.file_name
// //                           )
// //                         }
// //                       />
// //                     ) : (
// //                       <>
// //                         <FiFile size={20} className="text-gray-600" />
// //                         <span className="flex-1 text-blue-700 truncate">
// //                           {truncateFileName(attachment.file_name, 20)}
// //                         </span>
// //                         <FiDownload
// //                           size={20}
// //                           className="text-gray-600 cursor-pointer"
// //                           onClick={() => {
// //                             const link = document.createElement("a");
// //                             link.href = `http://localhost:3000/${attachment.file_path}`;
// //                             link.download = attachment.file_name;
// //                             document.body.appendChild(link);
// //                             link.click();
// //                             document.body.removeChild(link);
// //                           }}
// //                         />
// //                       </>
// //                     )}
// //                   </div>
// //                 ))}
// //           </div>
// //         )}
// //         <span className="block text-xs text-gray-500 mt-1">{timestamp}</span>
// //       </div>
// //       <ImagePreviewModal
// //         isOpen={isPreviewOpen}
// //         imageSrc={previewImage}
// //         fileName={previewFileName}
// //         onClose={() => setPreviewOpen(false)}
// //       />
// //     </div>
// //   );
// // };

// // export default MessageItem;
// // MessageItem.tsx
// import React, { useState } from "react";
// import { FiFile, FiDownload } from "react-icons/fi";
// import ImagePreviewModal from "../Modal/ImagePreviewModal";
// import API_BASE_URL from "../../API/config"; // Убедитесь, что путь к конфигурации API правильный

// // Определение интерфейса для вложений
// interface Attachment {
//   id: string;
//   file_name: string;
//   file_path: string;
//   created_at: string;
//   message_id: string;
// }

// interface MessageItemProps {
//   text: string;
//   timestamp: string;
//   isOwn: boolean;
//   attachments: Attachment[] | string[];
//   avatarUrl?: string;
// }

// // Функция для определения, является ли файл изображением по расширению
// const isImage = (fileName: string): boolean => {
//   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(fileName);
// };

// // Функция для сокращения названия файла, если оно превышает максимальную длину
// const truncateFileName = (name: string, maxLength: number = 20): string => {
//   if (name.length <= maxLength) return name;
//   return `${name.slice(0, maxLength - 3)}...`;
// };

// // Type Guard для проверки, является ли attachments массивом строк
// const isStringArray = (attachments: Attachment[] | string[]): attachments is string[] => {
//   return attachments.length > 0 && typeof attachments[0] === "string";
// };

// const MessageItem: React.FC<MessageItemProps> = ({
//   text,
//   timestamp,
//   isOwn,
//   attachments,
//   avatarUrl,
// }) => {
//   const [isPreviewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewFileName, setPreviewFileName] = useState("");

//   // Функция для открытия модального окна предпросмотра изображения
//   const openPreview = (imageSrc: string, fileName: string) => {
//     setPreviewImage(imageSrc);
//     setPreviewFileName(fileName);
//     setPreviewOpen(true);
//   };

//   return (
//     <div
//       className={`flex items-start ${
//         isOwn ? "justify-end" : "justify-start"
//       } mb-4`}
//     >
//       {/* Отображение аватара, если сообщение не от текущего пользователя */}
//       {!isOwn && (
//         <img
//           src={avatarUrl || "https://via.placeholder.com/40"}
//           alt="Avatar"
//           className="w-10 h-10 rounded-full mr-3"
//         />
//       )}
//       <div
//         className={`max-w-xs p-3 rounded-lg ${
//           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
//         }`}
//       >
//         <p className="whitespace-pre-wrap">{text}</p>
//         {/* Отображение вложений, если они есть */}
//         {attachments.length > 0 && (
//           <div className="mt-2 space-y-2">
//             {isStringArray(attachments)
//               ? // Обработка старого формата вложений (массив строковых URL)
//                 attachments.map((url, index) =>
//                   isImage(url) ? (
//                     <img
//                       key={index}
//                       src={url}
//                       alt={`Attachment ${index + 1}`}
//                       className="w-full h-auto rounded-lg cursor-pointer"
//                       loading="lazy"
//                       onClick={() => openPreview(url, `image-${index + 1}`)}
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src =
//                           "https://via.placeholder.com/150?text=Image+Not+Available";
//                       }}
//                     />
//                   ) : (
//                     <div key={index} className="flex items-center space-x-2">
//                       <FiFile size={20} className="text-gray-600" />
//                       <span className="flex-1 text-blue-700 truncate">
//                         {truncateFileName(url, 20)}
//                       </span>
//                       <FiDownload
//                         size={20}
//                         className="text-gray-600 cursor-pointer"
//                         onClick={() => {
//                           const link = document.createElement("a");
//                           link.href = url;
//                           link.download = url.split("/").pop() || "file";
//                           document.body.appendChild(link);
//                           link.click();
//                           document.body.removeChild(link);
//                         }}
//                       />
//                     </div>
//                   )
//                 )
//               : // Обработка нового формата вложений (массив объектов Attachment)
//                 attachments.map((attachment) => (
//                   <div key={attachment.id} className="flex items-center space-x-2">
//                     {isImage(attachment.file_name) ? (
//                       <img
//                         src={`${API_BASE_URL}/${attachment.file_path}`}
//                         alt={attachment.file_name}
//                         className="w-full h-auto rounded-lg cursor-pointer"
//                         loading="lazy"
//                         onClick={() =>
//                           openPreview(
//                             `${API_BASE_URL}/${attachment.file_path}`,
//                             attachment.file_name
//                           )
//                         }
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "https://via.placeholder.com/150?text=Image+Not+Available";
//                         }}
//                       />
//                     ) : (
//                       <>
//                         <FiFile size={20} className="text-gray-600" />
//                         <span className="flex-1 text-blue-700 truncate">
//                           {truncateFileName(attachment.file_name, 20)}
//                         </span>
//                         <FiDownload
//                           size={20}
//                           className="text-gray-600 cursor-pointer"
//                           onClick={() => {
//                             const link = document.createElement("a");
//                             link.href = `${API_BASE_URL}/${attachment.file_path}`;
//                             link.download = attachment.file_name;
//                             document.body.appendChild(link);
//                             link.click();
//                             document.body.removeChild(link);
//                           }}
//                         />
//                       </>
//                     )}
//                   </div>
//                 ))}
//           </div>
//         )}
//         {/* Отображение отформатированного времени */}
//         <span className="block text-xs text-gray-500 mt-1">{timestamp}</span>
//       </div>
//       {/* Модальное окно предпросмотра изображения */}
//       <ImagePreviewModal
//         isOpen={isPreviewOpen}
//         imageSrc={previewImage}
//         fileName={previewFileName}
//         onClose={() => setPreviewOpen(false)}
//       />
//     </div>
//   );
// };

// export default MessageItem;
// // // // MessageItem.tsx
// // // import React from "react";
// // // import { FiFile, FiDownload } from "react-icons/fi"; // Добавлена иконка FiDownload для действия скачивания


// // // interface MessageItemProps {
// // //   text: string;
// // //   timestamp: string;
// // //   isOwn: boolean;
// // //   attachments: string[];
// // //   avatarUrl?: string; // Опциональный пропс для динамических аватаров
// // // }

// // // const isImage = (url: string): boolean => {
// // //   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(url);
// // // };

// // // const getFileName = (url: string): string => {
// // //   try {
// // //     return decodeURIComponent(url.split("/").pop() || "File");
// // //   } catch {
// // //     return "File";
// // //   }
// // // };

// // // // Функция для сокращения названий файлов
// // // const truncateFileName = (name: string, maxLength: number = 20): string => {
// // //   if (name.length <= maxLength) return name;
// // //   return `${name.slice(0, maxLength - 3)}...`;
// // // };

// // // const MessageItem: React.FC<MessageItemProps> = ({
// // //   text,
// // //   timestamp,
// // //   isOwn,
// // //   attachments,
// // //   avatarUrl,
// // // }) => {
// // //   return (
// // //     <div
// // //       className={`flex items-start ${
// // //         isOwn ? "justify-end" : "justify-start"
// // //       } mb-4`}
// // //     >
// // //       {/* Отображение аватара, если сообщение не от текущего пользователя */}
// // //       {!isOwn && avatarUrl && (
// // //         <img
// // //           src={avatarUrl}
// // //           alt="Avatar"
// // //           className="w-10 h-10 rounded-full mr-3"
// // //         />
// // //       )}
// // //       {/* Запасной аватар, если avatarUrl не предоставлен */}
// // //       {!isOwn && !avatarUrl && (
// // //         <img
// // //           src="https://via.placeholder.com/40"
// // //           alt="Default Avatar"
// // //           className="w-10 h-10 rounded-full mr-3"
// // //         />
// // //       )}
// // //       <div
// // //         className={`max-w-xs p-3 rounded-lg ${
// // //           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
// // //         }`}
// // //       >
// // //         <p className="whitespace-pre-wrap">{text}</p>
// // //         {/* Отображение вложений, если они есть */}
// // //         {attachments.length > 0 && (
// // //           <div className="mt-2 space-y-2">
// // //             {attachments.map((url, index) =>
// // //               isImage(url) ? (
// // //                 <img
// // //                   key={index}
// // //                   src={url}
// // //                   alt={`Attachment ${index + 1}`}
// // //                   className="w-full h-auto rounded-lg"
// // //                   loading="lazy"
// // //                   onError={(e) => {
// // //                     (e.target as HTMLImageElement).src =
// // //                       "https://via.placeholder.com/150?text=Image+Not+Available";
// // //                   }}
// // //                 />
// // //               ) : (
// // //                 <div
// // //                   key={index}
// // //                   className="flex items-center space-x-2"
// // //                 >
// // //                   <FiFile size={20} className="text-gray-600" />
// // //                   {/* Отображение названия файла без ссылки */}
// // //                   <span className="flex-1 text-blue-700 truncate">
// // //                     {truncateFileName(getFileName(url), 20)}
// // //                   </span>
// // //                   <FiDownload
// // //                     size={20}
// // //                     className="text-gray-600 cursor-pointer"
// // //                     onClick={() => {
// // //                       // Инициация скачивания файла
// // //                       const link = document.createElement("a");
// // //                       link.href = url;
// // //                       link.download = getFileName(url);
// // //                       document.body.appendChild(link);
// // //                       link.click();
// // //                       document.body.removeChild(link);
// // //                     }}
// // //                   />
// // //                 </div>
// // //               )
// // //             )}
// // //           </div>
// // //         )}
// // //         {/* Отображение отформатированного времени */}
// // //         <span className="block text-xs text-gray-500 mt-1">
// // //           {timestamp}
// // //         </span>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MessageItem;

// // import React from "react";
// // import { FiFile, FiDownload } from "react-icons/fi"; // Добавлена иконка FiDownload для действия скачивания

// // interface Attachment {
// //   id: string;
// //   file_name: string;
// //   file_path: string;
// //   created_at: string;
// //   message_id: string;
// // }

// // interface MessageItemProps {
// //   text: string;
// //   timestamp: string;
// //   isOwn: boolean;
// //   attachments: Attachment[];
// //   avatarUrl?: string; // Опциональный пропс для динамических аватаров
// // }

// // const isImage = (fileName: string): boolean => {
// //   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(fileName);
// // };

// // const truncateFileName = (name: string, maxLength: number = 20): string => {
// //   if (name.length <= maxLength) return name;
// //   return `${name.slice(0, maxLength - 3)}...`;
// // };

// // const MessageItem: React.FC<MessageItemProps> = ({
// //   text,
// //   timestamp,
// //   isOwn,
// //   attachments,
// //   avatarUrl,
// // }) => {
// //   return (
// //     <div
// //       className={`flex items-start ${
// //         isOwn ? "justify-end" : "justify-start"
// //       } mb-4`}
// //     >
// //       {/* Отображение аватара, если сообщение не от текущего пользователя */}
// //       {!isOwn && avatarUrl && (
// //         <img
// //           src={avatarUrl}
// //           alt="Avatar"
// //           className="w-10 h-10 rounded-full mr-3"
// //         />
// //       )}
// //       {/* Запасной аватар, если avatarUrl не предоставлен */}
// //       {!isOwn && !avatarUrl && (
// //         <img
// //           src="https://via.placeholder.com/40"
// //           alt="Default Avatar"
// //           className="w-10 h-10 rounded-full mr-3"
// //         />
// //       )}
// //       <div
// //         className={`max-w-xs p-3 rounded-lg ${
// //           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
// //         }`}
// //       >
// //         <p className="whitespace-pre-wrap">{text}</p>
// //         {/* Отображение вложений, если они есть */}
// //         {attachments.length > 0 && (
// //           <div className="mt-2 space-y-2">
// //             {attachments.map((attachment, index) => (
// //               <div key={attachment.id} className="flex items-center space-x-2">
// //                 {isImage(attachment.file_name) ? (
// //                   <img
// //                     src={`file://localhost:3000/${attachment.file_path}`}
// //                     alt={attachment.file_name}
// //                     className="w-full h-auto rounded-lg"
// //                     loading="lazy"
// //                     onError={(e) => {
// //                       (e.target as HTMLImageElement).src =
// //                         "https://via.placeholder.com/150?text=Image+Not+Available";
// //                     }}
// //                   />
// //                 ) : (
// //                   <>
// //                     <FiFile size={20} className="text-gray-600" />
// //                     <span className="flex-1 text-blue-700 truncate">
// //                       {truncateFileName(attachment.file_name, 20)}
// //                     </span>
// //                     <FiDownload
// //                       size={20}
// //                       className="text-gray-600 cursor-pointer"
// //                       onClick={() => {
// //                         const link = document.createElement("a");
// //                         link.href = `http://localhost:3000/${attachment.file_path}`;
// //                         link.download = attachment.file_name;
// //                         document.body.appendChild(link);
// //                         link.click();
// //                         document.body.removeChild(link);
// //                       }}
// //                     />
// //                   </>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //         {/* Отображение отформатированного времени */}
// //         <span className="block text-xs text-gray-500 mt-1">
// //           {timestamp}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MessageItem;
// import React, { useState } from "react";
// import { FiFile, FiDownload } from "react-icons/fi";
// import ImagePreviewModal from "../Modal/ImagePreviewModal";
// import API_BASE_URL from "../../API/config";
// interface Attachment {
//   id: string;
//   file_name: string;
//   file_path: string;
//   created_at: string;
//   message_id: string;
// }

// interface MessageItemProps {
//   text: string;
//   timestamp: string;
//   isOwn: boolean;
//   attachments: Attachment[] | string[];
//   avatarUrl?: string;
// }

// const isImage = (fileName: string): boolean => {
//   return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(fileName);
// };

// const truncateFileName = (name: string, maxLength: number = 20): string => {
//   if (name.length <= maxLength) return name;
//   return `${name.slice(0, maxLength - 3)}...`;
// };

// const MessageItem: React.FC<MessageItemProps> = ({
//   text,
//   timestamp,
//   isOwn,
//   attachments,
//   avatarUrl,
// }) => {
//   const [isPreviewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewFileName, setPreviewFileName] = useState("");

//   const openPreview = (imageSrc: string, fileName: string) => {
//     setPreviewImage(imageSrc);
//     setPreviewFileName(fileName);
//     setPreviewOpen(true);
//   };

//   const isOldFormat = (attachments: Attachment[] | string[]): attachments is string[] =>
//     typeof attachments[0] === "string";

//   return (
//     <div
//       className={`flex items-start ${
//         isOwn ? "justify-end" : "justify-start"
//       } mb-4`}
//     >
//       {!isOwn && avatarUrl && (
//         <img
//           src={avatarUrl}
//           alt="Avatar"
//           className="w-10 h-10 rounded-full mr-3"
//         />
//       )}
//       {!isOwn && !avatarUrl && (
//         <img
//           src="https://via.placeholder.com/40"
//           alt="Default Avatar"
//           className="w-10 h-10 rounded-full mr-3"
//         />
//       )}
//       <div
//         className={`max-w-xs p-3 rounded-lg ${
//           isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
//         }`}
//       >
//         <p className="whitespace-pre-wrap">{text}</p>
//         {attachments.length > 0 && (
//           <div className="mt-2 space-y-2">
//             {isOldFormat(attachments)
//               ? attachments.map((url, index) =>
//                   isImage(url) ? (
//                     <img
//                       key={index}
//                       src={url}
//                       alt={`Attachment ${index + 1}`}
//                       className="w-full h-auto rounded-lg cursor-pointer"
//                       loading="lazy"
//                       onClick={() => openPreview(url, `image-${index + 1}`)}
//                     />
//                   ) : (
//                     <div key={index} className="flex items-center space-x-2">
//                       <FiFile size={20} className="text-gray-600" />
//                       <span className="flex-1 text-blue-700 truncate">
//                         {truncateFileName(url, 20)}
//                       </span>
//                       <FiDownload
//                         size={20}
//                         className="text-gray-600 cursor-pointer"
//                         onClick={() => {
//                           const link = document.createElement("a");
//                           link.href = url;
//                           link.download = url;
//                           document.body.appendChild(link);
//                           link.click();
//                           document.body.removeChild(link);
//                         }}
//                       />
//                     </div>
//                   )
//                 )
//               : attachments.map((attachment, index) => (
//                   <div key={attachment.id} className="flex items-center space-x-2">
//                     {isImage(attachment.file_name) ? (
//                       <img
//                         src={`http://localhost:3000/${attachment.file_path}`}
//                         alt={attachment.file_name}
//                         className="w-full h-auto rounded-lg cursor-pointer"
//                         loading="lazy"
//                         onClick={() =>
//                           openPreview(
//                             `http://localhost:3000/${attachment.file_path}`,
//                             attachment.file_name
//                           )
//                         }
//                       />
//                     ) : (
//                       <>
//                         <FiFile size={20} className="text-gray-600" />
//                         <span className="flex-1 text-blue-700 truncate">
//                           {truncateFileName(attachment.file_name, 20)}
//                         </span>
//                         <FiDownload
//                           size={20}
//                           className="text-gray-600 cursor-pointer"
//                           onClick={() => {
//                             const link = document.createElement("a");
//                             link.href = `http://localhost:3000/${attachment.file_path}`;
//                             link.download = attachment.file_name;
//                             document.body.appendChild(link);
//                             link.click();
//                             document.body.removeChild(link);
//                           }}
//                         />
//                       </>
//                     )}
//                   </div>
//                 ))}
//           </div>
//         )}
//         <span className="block text-xs text-gray-500 mt-1">{timestamp}</span>
//       </div>
//       <ImagePreviewModal
//         isOpen={isPreviewOpen}
//         imageSrc={previewImage}
//         fileName={previewFileName}
//         onClose={() => setPreviewOpen(false)}
//       />
//     </div>
//   );
// };

// export default MessageItem;
// MessageItem.tsx
import React, { useState } from "react";
import { FiFile, FiDownload } from "react-icons/fi";
import ImagePreviewModal from "../Modal/ImagePreviewModal";
import API_BASE_URL from "../../API/config"; // Убедитесь, что путь к конфигурации API правильный

// Определение интерфейса для вложений
interface Attachment {
  id: string;
  file_name: string;
  file_path: string;
  created_at: string;
  message_id: string;
}

interface MessageItemProps {
  text: string;
  timestamp: string;
  isOwn: boolean;
  attachments: Attachment[] | string[];
  avatarUrl?: string;
}

// Функция для определения, является ли файл изображением по расширению
const isImage = (fileName: string): boolean => {
  return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(fileName);
};

// Функция для сокращения названия файла, если оно превышает максимальную длину
const truncateFileName = (name: string, maxLength: number = 20): string => {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength - 3)}...`;
};

// Type Guard для проверки, является ли attachments массивом строк
const isStringArray = (attachments: Attachment[] | string[]): attachments is string[] => {
  return attachments.length > 0 && typeof attachments[0] === "string";
};

const MessageItem: React.FC<MessageItemProps> = ({
  text,
  timestamp,
  isOwn,
  attachments,
  avatarUrl,
}) => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewFileName, setPreviewFileName] = useState("");

  // Функция для открытия модального окна предпросмотра изображения
  const openPreview = (imageSrc: string, fileName: string) => {
    setPreviewImage(imageSrc);
    setPreviewFileName(fileName);
    setPreviewOpen(true);
  };

  return (
    <div
      className={`flex items-start ${
        isOwn ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {/* Отображение аватара, если сообщение не от текущего пользователя */}
      {!isOwn && (
        <img
          src={avatarUrl || "https://via.placeholder.com/40"}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        {/* Отображение вложений, если они есть */}
        {attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {isStringArray(attachments)
              ? // Обработка старого формата вложений (массив строковых URL)
                attachments.map((url, index) =>
                  isImage(url) ? (
                    <img
                      key={index}
                      src={url}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-auto rounded-lg cursor-pointer"
                      loading="lazy"
                      onClick={() => openPreview(url, `image-${index + 1}`)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/150?text=Image+Not+Available";
                      }}
                    />
                  ) : (
                    <div key={index} className="flex items-center space-x-2">
                      <FiFile size={20} className="text-gray-600" />
                      <span className="flex-1 text-blue-700 truncate">
                        {truncateFileName(url, 20)}
                      </span>
                      <FiDownload
                        size={20}
                        className="text-gray-600 cursor-pointer"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = url.split("/").pop() || "file";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      />
                    </div>
                  )
                )
              : // Обработка нового формата вложений (массив объектов Attachment)
                attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center space-x-2">
                    {isImage(attachment.file_name) ? (
                      <img
                        src={`${API_BASE_URL}/${attachment.file_path}`}
                        alt={attachment.file_name}
                        className="w-full h-auto rounded-lg cursor-pointer"
                        loading="lazy"
                        onClick={() =>
                          openPreview(
                            `${API_BASE_URL}/${attachment.file_path}`,
                            attachment.file_name
                          )
                        }
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150?text=Image+Not+Available";
                        }}
                      />
                    ) : (
                      <>
                        <FiFile size={20} className="text-gray-600" />
                        <span className="flex-1 text-blue-700 truncate">
                          {truncateFileName(attachment.file_name, 20)}
                        </span>
                        <FiDownload
                          size={20}
                          className="text-gray-600 cursor-pointer"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = `${API_BASE_URL}/${attachment.file_path}`;
                            link.download = attachment.file_name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
          </div>
        )}
        {/* Отображение отформатированного времени */}
        <span className="block text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
      {/* Модальное окно предпросмотра изображения */}
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        imageSrc={previewImage}
        fileName={previewFileName}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  );
};

export default MessageItem;

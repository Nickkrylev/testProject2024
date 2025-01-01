import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import  { useState } from "react";
import AuthWrapper from "./components/AuthAndReg/AuthWrapper";
import LoginForm from "./components/AuthAndReg/LoginForm";
import RegisterForm from "./components/AuthAndReg/RegisterForm";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/Main/ChatWindow";

function App() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  

  // Состояние для хранения выбранного чата
  const [selectedChat, setSelectedChat] = useState<{
    id: string;
    name: string;
    avatarUrl?: string;
  } | null>(null);

  // Обработчик выбора чата
  const handleChatSelect = (chat: { userId: string; name: string; avatarUrl?: string }) => {
    setSelectedChat({
      id: chat.userId, 
      name: chat.name,
      avatarUrl: chat.avatarUrl,
    });
    console.log(chat);
  
  };
  


  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Если пользователь не найден — рендерим LoginForm,
              иначе переходим на /dashboard */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthWrapper>
                  <LoginForm />
                </AuthWrapper>
              )
            }
          />

          {/* Если пользователь не найден — рендерим RegisterForm,
              иначе переходим на /dashboard */}
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthWrapper>
                  <RegisterForm />
                </AuthWrapper>
              )
            }
          />

          {/* Защищённый маршрут: если пользователь НЕ аутентифицирован, отправляем на главную ("/") */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <div className="flex">
                  {/* Передаем обработчик выбора чата в Sidebar */}
                  <Sidebar user={user} onChatSelect={handleChatSelect} />
                  {/* Рендерим ChatWindow только если выбран чат */}
                  {selectedChat ? (
                    <ChatWindow user={user} receiverId={selectedChat.id} receiveName = {selectedChat.name}/>
                  ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-500">
                      No dialogs selected
                    </div>
                  )}
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Перенаправление на главную, если маршрут не найден */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

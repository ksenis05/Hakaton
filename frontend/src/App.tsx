import { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('recommendations');

  const mockUsers = [
    {
      id: 1,
      first_name: "Анна",
      last_name: "Иванова",
      position: "Frontend разработчик",
      interests: ["React", "Йога", "Кино"]
    },
    {
      id: 2,
      first_name: "Петр", 
      last_name: "Сидоров",
      position: "Backend разработчик",
      interests: ["Python", "Футбол", "Музыка"]
    }
  ];

  const handleConnect = (userId: number) => {
    alert(`Запрос отправлен пользователю ${userId}`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Контур.Мит</h1>
        <p>Найди друзей по интересам</p>
      </header>

      <main className="app-content">
        {activeTab === 'recommendations' && (
          <div className="recommendations">
            <h2>Рекомендации для вас</h2>
            
            <div className="recommendations-grid">
              {mockUsers.map(user => (
                <div key={user.id} className="user-card">
                  <div className="avatar"></div>
                  <div className="user-info">
                    <h3>{user.first_name} {user.last_name}</h3>
                    <p>{user.position}</p>
                    <div className="common-interests">
                      <strong>Общие интересы:</strong>
                      {user.interests.map(interest => (
                        <span key={interest} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleConnect(user.id)}
                    className="connect-btn"
                  >
                    Стать на связи
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile">
            <h2>Мой профиль</h2>
            <div className="avatar-large"></div>
            <p><strong>Иван Петров</strong></p>
            <p>Разработчик</p>
            <button>Редактировать профиль</button>
          </div>
        )}
      </main>

      <nav className="tab-bar">
        <button 
          className={activeTab === 'recommendations' ? 'active' : ''}
          onClick={() => setActiveTab('recommendations')}
        >
          👥 Рекомендации
        </button>
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          👤 Профиль
        </button>
      </nav>
    </div>
  );
}

export default App;
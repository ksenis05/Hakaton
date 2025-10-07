import { useState, useEffect } from 'react';
import { userApi } from './services/api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [recommendations, setRecommendations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [user, recs] = await Promise.all([
        userApi.getCurrentUser(),
        userApi.getRecommendations()
      ]);
      setCurrentUser(user);
      setRecommendations(recs);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      // Fallback данные
      setCurrentUser({
        id: 1,
        first_name: "Иван",
        last_name: "Петров",
        position: "Разработчик",
        interests: ["программирование", "спорт", "кино"]
      });
      setRecommendations([
        {
          id: 2,
          first_name: "Анна",
          last_name: "Иванова",
          position: "Frontend разработчик",
          interests: ["React", "Йога", "Кино"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (userId) => {
    alert(`Запрос отправлен пользователю ${userId}`);
  };

  if (loading) {
    return <div className="app">Загрузка...</div>;
  }

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
              {recommendations.map(user => (
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

        {activeTab === 'profile' && currentUser && (
          <div className="profile">
            <h2>Мой профиль</h2>
            <div className="avatar-large"></div>
            <p><strong>{currentUser.first_name} {currentUser.last_name}</strong></p>
            <p>{currentUser.position}</p>
            <div className="common-interests">
              <strong>Мои интересы:</strong>
              {currentUser.interests.map(interest => (
                <span key={interest} className="interest-tag">{interest}</span>
              ))}
            </div>
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
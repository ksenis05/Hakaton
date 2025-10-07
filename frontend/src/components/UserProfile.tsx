import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    about: string;
    interests: string[];
    telegram: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({});

    // Mock данные пользователя
    useEffect(() => {
        const mockUser: User = {
            id: 1,
            first_name: "Иван",
            last_name: "Петров",
            position: "Разработчик",
            about: "Люблю программировать и заниматься спортом",
            interests: ["программирование", "спорт", "кино"],
            telegram: "@ivanpetrov"
        };
        setUser(mockUser);
    }, []);

    const handleSave = async () => {
        if (!user) return;
        
        try {
            const updatedUser = { ...user, ...formData };
            setUser(updatedUser);
            setIsEditing(false);
            setFormData({});
            alert('Профиль успешно обновлен!');
        } catch (error) {
            console.error('Ошибка обновления профиля:', error);
        }
    };

    const handleInputChange = (field: keyof User, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="avatar"></div>
                <h2>{user.first_name} {user.last_name}</h2>
                <p>{user.position}</p>
            </div>

            {!isEditing ? (
                <div className="profile-info">
                    <p><strong>О себе:</strong> {user.about || 'Не указано'}</p>
                    <p><strong>Интересы:</strong> {user.interests.join(', ') || 'Не указаны'}</p>
                    <p><strong>Telegram:</strong> {user.telegram || 'Не указан'}</p>
                    <button onClick={() => setIsEditing(true)}>Редактировать профиль</button>
                </div>
            ) : (
                <div className="edit-form">
                    <div>
                        <label>О себе:</label>
                        <textarea 
                            value={formData.about !== undefined ? formData.about : user.about || ''}
                            onChange={(e) => handleInputChange('about', e.target.value)}
                            maxLength={800}
                            rows={4}
                        />
                    </div>
                    <div>
                        <label>Интересы (через запятую):</label>
                        <input 
                            type="text"
                            value={formData.interests !== undefined ? formData.interests.join(', ') : user.interests.join(', ')}
                            onChange={(e) => handleInputChange('interests', e.target.value.split(',').map(i => i.trim()))}
                            placeholder="программирование, спорт, кино"
                        />
                    </div>
                    <div>
                        <label>Telegram:</label>
                        <input 
                            type="text"
                            value={formData.telegram !== undefined ? formData.telegram : user.telegram || ''}
                            onChange={(e) => handleInputChange('telegram', e.target.value)}
                            placeholder="@username"
                        />
                    </div>
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={() => setIsEditing(false)}>Отмена</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
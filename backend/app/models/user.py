from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    position = Column(String)
    department = Column(String)
    
    # Интересы и хобби
    interests = Column(JSON, default=list)  # ['спорт', 'кино', 'программирование']
    hobbies = Column(JSON, default=list)
    
    # Контактная информация
    telegram = Column(String)
    phone = Column(String)
    
    # О себе
    about = Column(Text)
    avatar_url = Column(String)
    
    # Настройки
    is_active = Column(Boolean, default=True)
    show_psycho_tests = Column(Boolean, default=False)

class UserMatch(Base):
    __tablename__ = "user_matches"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    matched_user_id = Column(Integer, index=True)
    match_score = Column(Integer)  # Процент совпадения
    common_interests = Column(JSON)
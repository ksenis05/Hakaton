from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    position: Optional[str] = None
    department: Optional[str] = None
    interests: List[str] = []
    hobbies: List[str] = []
    telegram: Optional[str] = None
    phone: Optional[str] = None
    about: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    position: Optional[str] = None
    interests: Optional[List[str]] = None
    hobbies: Optional[List[str]] = None
    telegram: Optional[str] = None
    phone: Optional[str] = None
    about: Optional[str] = None
    avatar_url: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    user: User
    match_score: int
    common_interests: List[str]
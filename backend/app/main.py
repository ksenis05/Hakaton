from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Контур.Мит API")

# Добавьте CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Добро пожаловать в Контур.Мит API!"}

@app.get("/users/me")
async def get_current_user():
    return {
        "id": 1,
        "first_name": "Иван",
        "last_name": "Петров", 
        "position": "Разработчик",
        "interests": ["программирование", "спорт", "кино"],
        "avatar_url": "/default-avatar.png"
    }

@app.get("/recommendations")
async def get_recommendations():
    return [
        {
            "id": 2,
            "first_name": "Анна",
            "last_name": "Иванова",
            "position": "Frontend разработчик",
            "interests": ["React", "Йога", "Кино"],
            "avatar_url": "/default-avatar.png"
        },
        {
            "id": 3,
            "first_name": "Петр",
            "last_name": "Сидоров", 
            "position": "Backend разработчик",
            "interests": ["Python", "Футбол", "Музыка"],
            "avatar_url": "/default-avatar.png"
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
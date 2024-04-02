from fastapi import FastAPI
import models
from database import engine
from routers import auth, todos, admin, users, fish_details
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = {
    'http://localhost:3000'
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
# app.include_router(todos.router)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(fish_details.router)

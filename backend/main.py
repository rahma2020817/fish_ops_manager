from fastapi import FastAPI
import models
from database import engine
from routers import auth, admin, users, cargaison, items, numaclature
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
app.include_router(cargaison.router)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(items.router)
app.include_router(numaclature.router)

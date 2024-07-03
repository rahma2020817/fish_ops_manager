from typing import Annotated
from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from models import Cargaison
from database import SessionLocal
from .auth import get_current_user

router = APIRouter(
    prefix='/cargaison',
    tags=['cargaison']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

class CargaisonRequest(BaseModel):
    numero_cargaison: str
    produit: str
    lieu_maraillage: str
    date_reception_quai: date
    usine_destination: str
    date_reception_usine: date
    numero_bon_livraison: str
    transporteur: str
    type_cargaison: str

@router.get("/", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Cargaison).filter(Cargaison.owner_id == user.get('id')).all()

@router.get("/{cargaison_id}", status_code=status.HTTP_200_OK)
async def read_cargaison(user: user_dependency, db: db_dependency, cargaison_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    cargaison_model = db.query(Cargaison).filter(Cargaison.id == cargaison_id)\
        .filter(Cargaison.owner_id == user.get('id')).first()
    if cargaison_model is not None:
        return cargaison_model
    raise HTTPException(status_code=404, detail='Cargaison not found.')

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_cargaison(user: user_dependency, db: db_dependency,
                           cargaison_request: CargaisonRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    cargaison_model = Cargaison(**cargaison_request.dict(), owner_id=user.get('id'))
    
    db.add(cargaison_model)
    db.commit()

@router.put("/{cargaison_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_cargaison(user: user_dependency, db: db_dependency,
                           cargaison_request: CargaisonRequest,
                           cargaison_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    cargaison_model = db.query(Cargaison).filter(Cargaison.id == cargaison_id)\
        .filter(Cargaison.owner_id == user.get('id')).first()
    if cargaison_model is None:
        raise HTTPException(status_code=404, detail='Cargaison not found.')

    for key, value in cargaison_request.dict().items():
        setattr(cargaison_model, key, value)

    db.commit()

@router.delete("/{cargaison_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cargaison(user: user_dependency, db: db_dependency, cargaison_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    cargaison_model = db.query(Cargaison).filter(Cargaison.id == cargaison_id)\
        .filter(Cargaison.owner_id == user.get('id')).first()
    if cargaison_model is None:
        raise HTTPException(status_code=404, detail='Cargaison not found.')
    
    db.delete(cargaison_model)
    db.commit()

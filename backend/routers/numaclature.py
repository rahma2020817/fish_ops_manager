from typing import Annotated
from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from models import Numaclature
from database import SessionLocal
from .auth import get_current_user

router = APIRouter(
    prefix='/numaclature',
    tags=['numaclature']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

class NumaclatureRequest(BaseModel):
    id: int
    nom_produit: str
    armateur: str
    description: str

@router.get("/", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Numaclature).filter(Numaclature.owner_id == user.get('id')).all()

@router.get("/{product_id}", status_code=status.HTTP_200_OK)
async def read_product(user: user_dependency, db: db_dependency, product_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    product_model = db.query(Numaclature).filter(Numaclature.id == product_id)\
        .filter(Numaclature.owner_id == user.get('id')).first()
    if product_model is not None:
        return product_model
    raise HTTPException(status_code=404, detail='product not found.')

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_product(user: user_dependency, db: db_dependency,
                           product_request: NumaclatureRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    # Check if the product exists
    product = db.query(NumaclatureRequest).filter(NumaclatureRequest.numero_product == product_request.numero_product).first()
    if not product:
        raise HTTPException(status_code=404, detail="product not found")

    product_model = Numaclature(**product_request.dict(), owner_id=user.get('id'))
    
    db.add(product_model)
    db.commit()
    return product_model

@router.put("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_product(user: user_dependency, db: db_dependency,
                           product_request: NumaclatureRequest,
                           product_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    product_model = db.query(Numaclature).filter(Numaclature.id == product_id)\
        .filter(Numaclature.owner_id == user.get('id')).first()
    if product_model is None:
        raise HTTPException(status_code=404, detail='Numaclature not found.')

    for key, value in product_request.dict().items():
        setattr(product_model, key, value)

    db.commit()

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(user: user_dependency, db: db_dependency, product_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    product_model = db.query(Numaclature).filter(Numaclature.id == product_id)\
        .filter(Numaclature.owner_id == user.get('id')).first()
    if product_model is None:
        raise HTTPException(status_code=404, detail='Numaclature not found.')
    
    db.delete(product_model)
    db.commit()

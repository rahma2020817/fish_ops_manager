from typing import Annotated
from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from models import Products
from database import SessionLocal
from .auth import get_current_user

router = APIRouter(
    prefix='/product',
    tags=['product']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class ItemRequest(BaseModel):
    lieu_mareyage: str
    date_reception: date
    date_mareyage: date
    type_produit: str
    taille_moyenne: Decimal
    temp_moyenne: Decimal


@router.get("/", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Products).filter(Products.owner_id == user.get('id')).all()


@router.get("/item/{item_id}", status_code=status.HTTP_200_OK)
async def read_item(user: user_dependency, db: db_dependency, item_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    item_model = db.query(Products).filter(Products.id == item_id)\
        .filter(Products.owner_id == user.get('id')).first()
    if item_model is not None:
        return item_model
    raise HTTPException(status_code=404, detail='item not found.')


@router.post("/item", status_code=status.HTTP_201_CREATED)
async def create_item(user: user_dependency, db: db_dependency,
                      item_request: ItemRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    item_model = Products(**item_request.dict(), owner_id=user.get('id'))

    db.add(item_model)
    db.commit()


@router.put("/item/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_item(user: user_dependency, db: db_dependency,
                      item_request: ItemRequest,
                      item_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    item_model = db.query(Products).filter(Products.id == item_id)\
        .filter(Products.owner_id == user.get('id')).first()
    if item_model is None:
        raise HTTPException(status_code=404, detail='item not found.')

    item_model.title = item_request.title
    item_model.description = item_request.description
    item_model.priority = item_request.priority
    item_model.complete = item_request.complete

    db.add(item_model)
    db.commit()


@router.delete("/item/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(user: user_dependency, db: db_dependency, item_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    item_model = db.query(Products).filter(Products.id == item_id)\
        .filter(Products.owner_id == user.get('id')).first()
    if item_model is None:
        raise HTTPException(status_code=404, detail='item not found.')
    db.query(Products).filter(Products.id == item_id).filter(Products.owner_id == user.get('id')).delete()

    db.commit()













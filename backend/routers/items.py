from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from typing import List
from starlette import status
from database import SessionLocal
from models import Item, Cargaison
from typing import Annotated
from .auth import get_current_user

router = APIRouter(
    prefix='/item',
    tags=['item']
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
    cargoID: str
    seq: str
    code_produit: str
    description_produit: str
    quantite: int
    taille: str
    temperature_moyenne: str
    type_emballage: str
    code_chariot: str
    destination: str
    inspecteur: str
    date_inspection: date
    couleur_peau: str
    couleur_oeil: str
    odeur: str
    integrite_tentacules: bool
    categorie: str
    comment: str

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_item(item_request: ItemRequest, db: db_dependency):
    # Check if the cargaison exists
    cargaison = db.query(Cargaison).filter(Cargaison.numero_cargaison == item_request.cargoID).first()
    if not cargaison:
        raise HTTPException(status_code=404, detail="Cargaison not found")

    item = Item(**item_request.dict())
    item = Item(**item_request.dict())
    db.add(item)
    db.commit()
    return item

@router.get("/{item_id}", response_model=ItemRequest, status_code=status.HTTP_200_OK)
async def read_item(item_id: int, db: db_dependency):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.get("/", response_model=List[ItemRequest], status_code=status.HTTP_200_OK)
async def read_all_items(db: db_dependency):
    return db.query(Item).all()

@router.put("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_item(item_id: int, item_request: ItemRequest, db: db_dependency):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in item_request.dict().items():
        setattr(item, key, value)

    db.commit()
    return {"message": "Item updated successfully"}

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int, db: db_dependency):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(item)
    db.commit()
    return {"message": "Item deleted successfully"}

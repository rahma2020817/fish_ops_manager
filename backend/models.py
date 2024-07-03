from database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date, Float
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String)
    # phone_number = Column(String)


# class Todos(Base):
#     __tablename__ = 'todos'

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     description = Column(String)
#     priority = Column(Integer)
#     complete = Column(Boolean, default=False)
#     owner_id = Column(Integer, ForeignKey("users.id"))



class Cargaison(Base):
    __tablename__ = 'cargaison'

    id = Column(Integer, primary_key=True, index=True)
    numero_cargaison = Column(String, unique=True, index=True)
    produit = Column(String)
    lieu_maraillage = Column(String)
    date_reception_quai = Column(Date)
    usine_destination = Column(String)
    date_reception_usine = Column(Date)
    numero_bon_livraison = Column(String)
    transporteur = Column(String)
    type_cargaison = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    items = relationship("Item", back_populates="cargaison")

class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    cargoID = Column(String, ForeignKey('cargaison.numero_cargaison'))
    seq = Column(String)
    code_produit = Column(String)
    description_produit = Column(String)
    quantite = Column(Integer)
    taille = Column(String)
    temperature_moyenne = Column(String)
    type_emballage = Column(String)
    code_chariot = Column(String)
    destination = Column(String)
    inspecteur = Column(String)
    date_inspection = Column(Date)
    couleur_peau = Column(String)
    couleur_oeil = Column(String)
    odeur = Column(String)
    integrite_tentacules = Column(Boolean)
    categorie = Column(String)
    comment = Column(String)

    cargaison = relationship("Cargaison", back_populates="items")

class Numaclature(Base):
    __tablename__ = 'produit'

    id = Column(Integer, primary_key=True, index=True)

    description = Column(String)
    nom_produit = Column(String)
    armateur = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

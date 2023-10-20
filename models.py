from database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date, Float


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


class Todos(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)
    complete = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))


class Products(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)

    date_mareyage = Column(Date)
    lieu_mareyage = Column(String)
    date_reception = Column(Date)
    type_produit = Column(String)
    taille_moyenne = Column(Float)
    temp_moyenne = Column(Float)
    owner_id = Column(Integer, ForeignKey("users.id"))


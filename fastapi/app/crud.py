from sqlalchemy.orm import Session
from app import models, schemas

def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Item).offset(skip).limit(limit).all()

def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())  
    db.add(db_item)
    db.commit() 
    db.refresh(db_item)
    return db_item

def update_item(db: Session, item_id: int, item_data: schemas.ItemUpdate):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item:
        if item_data.name is not None:
            item.name = item_data.name
        if item_data.description is not None:
            item.description = item_data.description
        if item_data.actors is not None:
            item.actors = item_data.actors
        if item_data.director is not None:
            item.director = item_data.director
        
        db.commit()
        db.refresh(item)
    return item


def delete_item(db: Session, item_id: int):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

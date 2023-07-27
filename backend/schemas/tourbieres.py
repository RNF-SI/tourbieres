from app import ma

from models.tourbieres import Tourbieres

class TourbieresSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Tourbieres
        include_fk = True


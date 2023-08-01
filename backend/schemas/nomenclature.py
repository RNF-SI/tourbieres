from app import ma

from models.nomenclature import Nomenclature

class NomenclatureSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Nomenclature
        # load_instance = True
        # include_fk = True
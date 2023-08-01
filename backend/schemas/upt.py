from app import ma

from models.upt import Upt
from schemas.nomenclature import NomenclatureSchema

class UptSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Upt
        include_fk = True
    connect = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    type = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
from app import ma

from models.nomenclature import Nomenclature, BibNomenclatureType

class NomenclatureSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Nomenclature
        # load_instance = True
        # include_fk = True

class BibNomenclatureTypeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = BibNomenclatureType
    items = ma.Nested(lambda: NomenclatureSchema, many=True)
from app import ma

from models.tourbieres import Tourbieres,Origine,Fonctionnement,Type,Stade,Tourbe,Pression, Peri_inf,Etat_cons
from schemas.nomenclature import NomenclatureSchema

class TourbieresSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Tourbieres
        include_fk = True
    origine = ma.Nested(lambda: OrigineSchema, many=False)
    fonctionnement = ma.Nested(lambda: FonctionnementSchema, many=False)
    type = ma.Nested(lambda: TypeSchema, many=False)
    stade = ma.Nested(lambda: StadeSchema, many=False)
    tourbe = ma.Nested(lambda: TourbeSchema, many=False)
    pression = ma.Nested(lambda: PressionSchema, many=False)
    perimetre_influence = ma.Nested(lambda: Peri_infSchema, many=False)
    etat_conservation = ma.Nested(lambda: Etat_consSchema, many=False)

class OrigineSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Origine
        include_fk = True

class FonctionnementSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Fonctionnement
        include_fk = True
    sourc_eau = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    nv_troph = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    ph_maj = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])

class TypeSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Type
        include_fk = True

class StadeSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Stade
        include_fk = True

class TourbeSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Tourbe
        include_fk = True

class PressionSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Pression
        include_fk = True
    tourism_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    tourism_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    incend_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    incend_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    derhyd_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    derhyd_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    sylvic_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    sylvic_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    enrich_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    enrich_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    polchim_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    polchim_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    patur_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    patur_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    pertclim_now = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    pertclim_evol = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])

class Peri_infSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Peri_inf
        include_fk = True
    part = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])

class Etat_consSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Etat_cons
        include_fk = True
    
    biodi_actu = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    biodi_tend = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    fonct_actu = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
    fonct_tend = ma.Nested(NomenclatureSchema, dump_only=True, only=['label',])
from app import ma

from models.tourbieres import Tourbieres,Origine,Fonctionnement,Type,Stade,Tourbe,Pression, Peri_inf,Etat_cons

class TourbieresSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Tourbieres
        include_fk = True
    origine = ma.Nested(lambda: OrigineSchema, many=False)
    fonctionnement = ma.Nested(lambda: OrigineSchema, many=False)
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

class Peri_infSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Peri_inf
        include_fk = True

class Etat_consSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Etat_cons
        include_fk = True
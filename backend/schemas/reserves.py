from app import ma

from models.reserves import Reserves, SuiviSt, ContactSt, ActionSt, DetermSt
from schemas.tourbieres import TourbieresSchema
from schemas.upt import UptSchema

class ReservesSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Reserves
        include_fk = True
    suivis = ma.Nested(lambda: SuiviStSchema, many=False)
    contact = ma.Nested(lambda: ContactStSchema, many=False)
    actions = ma.Nested(lambda: ActionStSchema, many=False)
    determinations = ma.Nested(lambda: DetermStSchema, many=False)
    tourbieres = ma.Nested(lambda: TourbieresSchema, many = True)
    upts = ma.Nested(lambda: UptSchema, many = True)

class SuiviStSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = SuiviSt
        include_fk = True

class ContactStSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = ContactSt

class ActionStSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = ActionSt

class DetermStSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = DetermSt
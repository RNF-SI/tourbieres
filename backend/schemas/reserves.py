from app import ma

from models.reserves import Reserves, SuiviSt, ContactSt, ActionSt, DetermSt

class ReservesSchema(ma.SQLAlchemyAutoSchema) :
    class Meta :
        model = Reserves
        # include_relationships = True
    suivis = ma.Nested(lambda: SuiviStSchema, many=False)
    contact = ma.Nested(lambda: ContactStSchema, many=False)
    actions = ma.Nested(lambda: ActionStSchema, many=False)
    determinations = ma.Nested(lambda: DetermStSchema, many=False)

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
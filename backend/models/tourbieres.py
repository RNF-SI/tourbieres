from app import db

class Tourbieres(db.Model):
    __tablename__ = 't_tourbieres'
    __table_args__ = {'schema': 'tourbieres'}

    id_t = db.Column(db.Integer, primary_key=True) 
    id_rnt = db.Column(db.String(6))
    nom = db.Column(db.String(255))
    superficie = db.Column(db.Float)
    activ = db.Column(db.String)
    
class Reserves(db.Model):
    __tablename__ = 't_reserves'
    __table_args__ = {'schema': 'reserves'}

    id_rnt = db.Column(db.Integer, primary_key=True) 
    id_local = db.Column(db.String(15), nullable=False, unique=True)
    id_inpn = db.Column(db.String(15), unique=True)
    type_rn = db.Column(db.String(3))
    nom_site = db.Column(db.String(254))
    jonction_nom = db.Column(db.String(254))
    enjx_st = db.Column(db.String(254))


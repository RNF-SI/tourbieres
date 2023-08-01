from app import db

# from models.reserves import Reserves
from models.nomenclature import Nomenclature

class Upt(db.Model):
    __tablename__ = 't_upt'
    __table_args__ = {'schema': 'unites_para_tourbeuses'}

    id_upt = db.Column(db.Integer, primary_key=True) 
    id_rnt = db.Column(db.String(6), db.ForeignKey('reserves.t_reserves.id_local'), nullable=False)
    nom = db.Column(db.String(255))
    superficie = db.Column(db.Float)
    upt_conect = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    connect = db.relationship(Nomenclature, foreign_keys=[upt_conect],)
    upt_connect_nom = db.Column(db.String(255))
    upt_type = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    type = db.relationship(Nomenclature, foreign_keys=[upt_type],)
    upt_type_autr = db.Column(db.Text)
    upt_enj_cons = db.Column(db.String(255))
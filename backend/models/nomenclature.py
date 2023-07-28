from app import db

class BibNomenclatureType(db.Model):
    __tablename__ = 'bib_nomenclatures_types'
    __table_args__ = {'schema': 'ref_nomenclatures'}

    id_type = db.Column(db.Integer, primary_key=True) 
    mnemonique = db.Column(db.String(255), nullable=False)
    label = db.Column(db.String(255))
    definition = db.Column(db.String(255))

class Nomenclature(db.Model):
    __tablename__ = 't_nomenclatures'
    __table_args__ = {'schema': 'ref_nomenclatures'}

    id_nomenclature = db.Column(db.Integer, primary_key=True) 
    id_type = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.bib_nomenclatures_types.id_type'), nullable=False)
    cd_nomenclature = db.Column(db.String(255), nullable=False)
    label = db.Column(db.String(255))
    definition = db.Column(db.String(255))
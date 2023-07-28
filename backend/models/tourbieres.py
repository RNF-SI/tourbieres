from app import db

from models.reserves import Reserves
from models.nomenclature import Nomenclature

class Tourbieres(db.Model):
    __tablename__ = 't_tourbieres'
    __table_args__ = {'schema': 'tourbieres'}

    id_t = db.Column(db.Integer, primary_key=True) 
    id_rnt = db.Column(db.String(6), db.ForeignKey('reserves.t_reserves.id_local'), nullable=False)
    nom = db.Column(db.String(255))
    superficie = db.Column(db.Float)
    activ = db.Column(db.String)
    origine = db.relationship("Origine", uselist=False, back_populates="tourbiere")
    fonctionnement = db.relationship("Fonctionnement", uselist=False, back_populates="tourbiere")
    type = db.relationship("Type", uselist=False, back_populates="tourbiere")
    stade = db.relationship("Stade", uselist=False, back_populates="tourbiere")
    tourbe = db.relationship("Tourbe", uselist=False, back_populates="tourbiere")
    pression = db.relationship("Pression", uselist=False, back_populates="tourbiere")
    perimetre_influence = db.relationship("Peri_inf", uselist=False, back_populates="tourbiere")
    etat_conservation = db.relationship("Etat_cons", uselist=False, back_populates="tourbiere")
    

class Origine(db.Model):
    __tablename__ = 't_origine'
    __table_args__ = {'schema': 'tourbieres'}

    id_origi = db.Column(db.Integer, primary_key=True)
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="origine")
    origi_lim = db.Column(db.Boolean)
    origi_flu = db.Column(db.Boolean)
    origi_omb = db.Column(db.Boolean)
    origi_top = db.Column(db.Boolean)
    origi_sol = db.Column(db.Boolean)
    origi_nsp = db.Column(db.Boolean)

class Fonctionnement(db.Model):
    __tablename__ = 't_fonctionnement'
    __table_args__ = {'schema': 'tourbieres'}

    id_foncti = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="fonctionnement")
    foncti_sourc_eau = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    foncti_nv_troph = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    foncti_ph_maj = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))

class Type(db.Model):
    __tablename__ = 't_type'
    __table_args__ = {'schema': 'tourbieres'}

    id_type = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="type")
    type_hau = db.Column(db.Boolean)
    type_hau_tail = db.Column(db.Float)
    type_bas = db.Column(db.Boolean)
    type_bas_tail = db.Column(db.Float)
    type_tra = db.Column(db.Boolean)
    type_tra_tail = db.Column(db.Float)
    type_autr = db.Column(db.Text)
    type_autr_tail = db.Column(db.Float)

class Stade(db.Model):
    __tablename__ = 't_stade'
    __table_args__ = {'schema': 'tourbieres'}

    id_stade = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="stade")
    stade_pion = db.Column(db.Boolean)
    stade_pion_tail = db.Column(db.Float)
    stade_opti = db.Column(db.Boolean)
    stade_opti_tail = db.Column(db.Float)
    stade_bois = db.Column(db.Boolean)
    stade_bois_tail = db.Column(db.Float)
    stade_autr = db.Column(db.Text)
    stade_autr_tail = db.Column(db.Float)

class Tourbe(db.Model):
    __tablename__ = 't_tourbe'
    __table_args__ = {'schema': 'tourbieres'}

    id_trbe = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="tourbe")
    trbe_prof = db.Column(db.Boolean)
    trbe_prof_com = db.Column(db.Float)
    trbe_vol = db.Column(db.Boolean)
    trbe_vol_com = db.Column(db.Float)
    trbe_moycarb = db.Column(db.Boolean)
    trbe_moycarb_com = db.Column(db.Float)
    trbe_bilcarb = db.Column(db.Boolean)
    trbe_bilcarb_com = db.Column(db.Float)
    trbe_stkcarb = db.Column(db.Boolean)
    trbe_stkcarb_com = db.Column(db.Float)
    trbe_prod = db.Column(db.Boolean)
    trbe_prod_com = db.Column(db.Float)

class Pression(db.Model):
    __tablename__ = 't_pression'
    __table_args__ = {'schema': 'tourbieres'}

    id_pres = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="pression")
    pres_tourism_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_tourism_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_incend_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_incend_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_derhyd_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_derhyd_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_sylvic_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_sylvic_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_enrich_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_enrich_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_polchim_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_polchim_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_patur_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_patur_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_pertclim_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pres_pertclim_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))

class Peri_inf(db.Model):
    __tablename__ = 't_peri_inf'
    __table_args__ = {'schema': 'tourbieres'}

    id_perinf = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="perimetre_influence")
    perinf_delim = db.Column(db.Boolean)
    perinf_surf = db.Column(db.Float)
    perinf_meth = db.Column(db.Text)
    perinf_part = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))

class Etat_cons(db.Model):
    __tablename__ = 't_etat_cons'
    __table_args__ = {'schema': 'tourbieres'}

    id_etcons = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="etat_conservation")
    etcons_biodi_actu = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    etcons_biodi_tend = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    etcons_fonct_actu = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    etcons_fonct_tend = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    etcons_restaur = db.Column(db.Boolean)
    etcons_restaur_com = db.Column(db.Text)
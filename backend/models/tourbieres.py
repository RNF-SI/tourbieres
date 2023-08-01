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
    sourc_eau = db.relationship(Nomenclature, foreign_keys=[foncti_sourc_eau],)
    foncti_nv_troph = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    nv_troph = db.relationship(Nomenclature, foreign_keys=[foncti_nv_troph],)
    foncti_ph_maj = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    ph_maj = db.relationship(Nomenclature, foreign_keys=[foncti_ph_maj],)

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
    tourism_now = db.relationship(Nomenclature, foreign_keys=[pres_tourism_now],)
    pres_tourism_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    tourism_evol = db.relationship(Nomenclature, foreign_keys=[pres_tourism_evol],)
    pres_incend_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    incend_now = db.relationship(Nomenclature, foreign_keys=[pres_incend_now],)
    pres_incend_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    incend_evol = db.relationship(Nomenclature, foreign_keys=[pres_incend_evol],)
    pres_derhyd_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    derhyd_now = db.relationship(Nomenclature, foreign_keys=[pres_derhyd_now],)
    pres_derhyd_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    derhyd_evol = db.relationship(Nomenclature, foreign_keys=[pres_derhyd_evol],)
    pres_sylvic_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    sylvic_now = db.relationship(Nomenclature, foreign_keys=[pres_sylvic_now],)
    pres_sylvic_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    sylvic_evol = db.relationship(Nomenclature, foreign_keys=[pres_sylvic_evol],)
    pres_enrich_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    enrich_now = db.relationship(Nomenclature, foreign_keys=[pres_enrich_now],)
    pres_enrich_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    enrich_evol = db.relationship(Nomenclature, foreign_keys=[pres_enrich_evol],)
    pres_polchim_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    polchim_now = db.relationship(Nomenclature, foreign_keys=[pres_polchim_now],)
    pres_polchim_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    polchim_evol = db.relationship(Nomenclature, foreign_keys=[pres_polchim_evol],)
    pres_patur_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    patur_now = db.relationship(Nomenclature, foreign_keys=[pres_patur_now],)
    pres_patur_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    patur_evol = db.relationship(Nomenclature, foreign_keys=[pres_patur_evol],)
    pres_pertclim_now = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pertclim_now = db.relationship(Nomenclature, foreign_keys=[pres_pertclim_now],)
    pres_pertclim_evol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    pertclim_evol = db.relationship(Nomenclature, foreign_keys=[pres_pertclim_evol],)

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
    part = db.relationship(Nomenclature, lazy="select", foreign_keys=[perinf_part],)

class Etat_cons(db.Model):
    __tablename__ = 't_etat_cons'
    __table_args__ = {'schema': 'tourbieres'}

    id_etcons = db.Column(db.Integer, primary_key=True) 
    id_t = db.Column(db.Integer, db.ForeignKey('tourbieres.t_tourbieres.id_t'), nullable=False)
    tourbiere = db.relationship("Tourbieres", back_populates="etat_conservation")
    etcons_biodi_actu = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    biodi_actu = db.relationship(Nomenclature, lazy="select", foreign_keys=[etcons_biodi_actu],)
    etcons_biodi_tend = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    biodi_tend = db.relationship(Nomenclature, lazy="select", foreign_keys=[etcons_biodi_tend],)
    etcons_fonct_actu = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    fonct_actu = db.relationship(Nomenclature, lazy="select", foreign_keys=[etcons_fonct_actu],)
    etcons_fonct_tend = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    fonct_tend = db.relationship(Nomenclature, lazy="select", foreign_keys=[etcons_fonct_tend],)
    etcons_restaur = db.Column(db.Boolean)
    etcons_restaur_com = db.Column(db.Text)
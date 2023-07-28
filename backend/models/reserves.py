from app import db

from models.nomenclature import Nomenclature

class Reserves(db.Model):
    __tablename__ = 't_reserves'
    __table_args__ = {'schema': 'reserves'}

    id_rnt = db.Column(db.Integer, primary_key=True) 
    id_local = db.Column(db.String(15), nullable=False, unique=True)
    id_inpn = db.Column(db.String(15), unique=True)
    type_rn = db.Column(db.String(3))
    nom_site = db.Column(db.String(254))
    jonction_nom = db.Column(db.String(254))
    enjx_st = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivis = db.relationship("SuiviSt", uselist=False, back_populates="reserve")
    contact = db.relationship("ContactSt", uselist=False, back_populates="reserve")
    actions = db.relationship("ActionSt", uselist=False, back_populates="reserve")
    determinations = db.relationship("DetermSt", uselist=False, back_populates="reserve")


class SuiviSt(db.Model) :
    __tablename__ = 't_suivi_st'
    __table_args__ = {'schema': 'reserves'}

    id_suivi = db.Column(db.Integer, primary_key=True) 
    id_rn = db.Column(db.String(15), db.ForeignKey('reserves.t_reserves.id_local'), nullable=False)
    reserve = db.relationship("Reserves", back_populates="suivis")
    suivi_bio_hab = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_mam = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_ois = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_batr = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_rep = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_veg = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_artt = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_arta = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_fun = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_lic = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_bry = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_alg = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_adn = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_pat = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_bio_com = db.Column(db.Text)
    suivi_hydro_qual = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_hydro_haut = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_hydro_geol = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_hydro_com = db.Column(db.Text)
    suivi_clim_pluv = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_clim_tair = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_clim_teau = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_clim_rayo = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_clim_vent = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_clim_com = db.Column(db.Text)
    suivi_phychi_phos = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_ph = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_turb = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_cond = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_azot = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_mes = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_oxyd = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_carb = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_autr = db.Column(db.Integer, db.ForeignKey('ref_nomenclatures.t_nomenclatures.id_nomenclature'))
    suivi_phychi_com = db.Column(db.Text)
    suivi_aucun_com = db.Column(db.Text)
    # suivi_autr = db.Column(db.Boolean)
    suivi_autr_com = db.Column(db.Text)

class ContactSt(db.Model) :
    __tablename__ = 't_contact_st'
    __table_args__ = {'schema': 'reserves'}

    id_contact = db.Column(db.Integer, primary_key=True) 
    id_rn = db.Column(db.String(15), db.ForeignKey('reserves.t_reserves.id_local'), nullable=False)
    reserve = db.relationship("Reserves", back_populates="contact")
    contact_nom = db.Column(db.String(255))
    contact_prenom = db.Column(db.String(255))
    contact_genre = db.Column(db.String(255))
    contact_emploi = db.Column(db.String(255))
    contact_mail = db.Column(db.String(255))
    contact_fixe = db.Column(db.String(255))
    contact_portable = db.Column(db.String(255))
    autorisation = db.Column(db.Boolean, default=True)

class ActionSt(db.Model) :
    __tablename__ = 't_action_st'
    __table_args__ = {'schema': 'reserves'}

    id_action = db.Column(db.Integer, primary_key=True) 
    id_rn = db.Column(db.String(15), db.ForeignKey('reserves.t_reserves.id_local'), nullable=False)
    reserve = db.relationship("Reserves", back_populates="actions")
    action_scie = db.Column(db.Boolean)
    action_scie_com = db.Column(db.Text)
    action_arche = db.Column(db.Boolean)
    action_arche_com = db.Column(db.Text)
    action_educ = db.Column(db.Boolean)
    action_educ_com = db.Column(db.Text)
    action_amen = db.Column(db.Boolean)
    action_amen_com = db.Column(db.Text)
    # action_autr = db.Column(db.Text)
    action_autr_com = db.Column(db.Text)
    
class DetermSt(db.Model):
    __tablename__ = 't_determ_st'
    __table_args__ = {'schema': 'reserves'}

    id_determ = db.Column(db.Integer, primary_key=True) 
    id_rn = db.Column(db.String(15), db.ForeignKey('reserves.t_reserves.id_local'), nullable=False)
    reserve = db.relationship("Reserves", back_populates="determinations")
    determ_prof_t = db.Column(db.Boolean)
    determ_prof_t_com = db.Column(db.Text)
    determ_carb_t = db.Column(db.Boolean)
    determ_carb_t_com = db.Column(db.Text)
    determ_flor_t = db.Column(db.Boolean)
    determ_flor_t_com = db.Column(db.Text)
    determ_autr_t = db.Column(db.Boolean)
    determ_autr_t_com = db.Column(db.Text)
    determ_prof_upt = db.Column(db.Boolean)
    determ_carb_upt = db.Column(db.Boolean)
    determ_flor_upt = db.Column(db.Boolean)
    determ_autr_upt = db.Column(db.Boolean)
    determ_com_upt = db.Column(db.Text)


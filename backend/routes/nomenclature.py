from flask import Blueprint, jsonify,request
from app import db

from models.nomenclature import BibNomenclatureType, Nomenclature
from schemas.nomenclature import BibNomenclatureTypeSchema, NomenclatureSchema

bp = Blueprint('nomenclature', __name__)

@bp.route('/nomenclatures', methods=['GET'])
def getNomenclature():
    nomenclatures = BibNomenclatureType.query.all()
    schema = BibNomenclatureTypeSchema(many=True)
    Obj = schema.dump(nomenclatures)

    return jsonify(Obj)

@bp.route('/nomenclature/<mnemonique>', methods=['GET'])
def getNomenclatureById(mnemonique):
    nomenclatures = BibNomenclatureType.query.filter_by(mnemonique=mnemonique).first()
    schema = BibNomenclatureTypeSchema(many=False)
    Obj = schema.dump(nomenclatures)

    return jsonify(Obj)
from flask import Blueprint, jsonify,request
from app import db

from models.tourbieres import Tourbieres
from schemas.tourbieres import TourbieresSchema

bp = Blueprint('tourbieres', __name__)

@bp.route('/tourbieres', methods=['GET'])
def getTourbieres():
    tourbieres = Tourbieres.query.all()
    schema = TourbieresSchema(many=True)
    Obj = schema.dump(tourbieres)

    return jsonify(Obj)


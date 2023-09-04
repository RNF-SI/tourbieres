from flask import Blueprint, jsonify,request
from app import db

from models.reserves import Reserves, SuiviSt
from schemas.reserves import ReservesSchema, SuiviStSchema

bp = Blueprint('reserves', __name__)

@bp.route('/reserves', methods=['GET'])
def getReserves():
    reserves = Reserves.query.order_by(Reserves.nom_site).all()
    schema = ReservesSchema(many=True)
    Obj = schema.dump(reserves)

    return jsonify(Obj)

@bp.route('/suivis', methods=['GET'])
def getSuivis():
    reserves = SuiviSt.query.all()
    print(reserves)
    schema = SuiviStSchema(many=True)
    Obj = schema.dump(reserves)

    return jsonify(Obj)
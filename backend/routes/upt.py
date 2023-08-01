from flask import Blueprint, jsonify,request
from app import db

from models.upt import Upt
from schemas.upt import UptSchema

bp = Blueprint('upt', __name__)

@bp.route('/upts', methods=['GET'])
def getUpts():
    upts = Upt.query.all()
    schema = UptSchema(many=True)
    Obj = schema.dump(upts)

    return jsonify(Obj)
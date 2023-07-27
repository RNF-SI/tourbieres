from flask import Blueprint, jsonify,request
from app import db

from models.tourbieres import Tourbieres
from schemas.tourbieres import TourbieresSchema

bp = Blueprint('tourbieres', __name__)

@bp.route('/maroute', methods=['GET'])
def getTourbieres():
    print(db)

    return {"mes":"coucou"}


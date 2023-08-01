from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import Config
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

cors = CORS(app, resources={ r'/*': {'origins': "*"}})

db = SQLAlchemy(app) # Lie notre app à SQLAlchemy
ma = Marshmallow(app)

migrate = Migrate(app, db)

from routes import tourbieres
app.register_blueprint(tourbieres.bp)

from routes import reserves
app.register_blueprint(reserves.bp)

from routes import upt
app.register_blueprint(upt.bp)
import os

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS 
from flask_migrate import Migrate 
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.json.compact=False 
app.secret_key = os.environ.get("secret_key")

# Add upload folder configuration
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'uploads')

# Create the upload folder if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db=SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

#Instantiate Bcrypt
bcrypt = Bcrypt(app)

api = Api(app)

CORS(app)


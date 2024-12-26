from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from werkzeug.utils import secure_filename

from flask import url_for, send_from_directory

from models import SignUpContainer, Continents, Country, CountriesContinent

from datetime import datetime

class AllContinents(Resource):
    def get(self):
        continents=[continent.to_dict() for continent in Continents.query.all()]
        return continents, 200 

api.add_resource(AllContinents, '/continents')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
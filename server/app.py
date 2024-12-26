from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from werkzeug.utils import secure_filename

from flask import url_for, send_from_directory

from models import SignUpContainer, Continents, Country, CountriesContinent, States, Cities, Users, Travelers

from datetime import datetime

class AllContinents(Resource):
    def get(self):
        continents=[continent.to_dict() for continent in Continents.query.all()]
        return continents, 200 

class AllCountries(Resource):
    def get(self):
        countries=[country.to_dict() for country in Country.query.all()]
        return countries, 200

class AllStates(Resource):
    def get(self):
        states = [state.to_dict() for state in States.query.all()]
        return states, 200

class AllCities(Resource):
    def get(self):
        cities=[city.to_dict() for city in Cities.query.all()]
        return cities, 200

class AllUsers(Resource):
    def get(self):
        users=[user.to_dict() for user in Users.query.all()]
        return users, 200 

class AllTravelers(Resource):
    def get(self):
        travelers=[traveler.to_dict() for traveler in Travelers.query.all()]
        return travelers, 200


api.add_resource(AllContinents, '/continents')

api.add_resource(AllCountries, '/countries')

api.add_resource(AllStates, '/states')

api.add_resource(AllCities, '/cities')

api.add_resource(AllUsers, '/users')

api.add_resource(AllTravelers, '/travelers')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
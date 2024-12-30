from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from werkzeug.utils import secure_filename

from flask import url_for, send_from_directory

from models import SignUpContainer, Continents, Country, CountriesContinent, States, Cities, Boroughs, Neighbourhoods, Users, Travelers, Businesses, Industry, BusinessesIndustries

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

class AllBoroughs(Resource):
    def get(self):
        boroughs = [borough.to_dict() for borough in Boroughs.query.all()]
        return boroughs, 200 

class AllNeighbourhoods(Resource):
    def get(self):
        neighbourhoods = [neighbourhood.to_dict() for neighbourhood in Neighbourhoods.query.all()]
        return neighbourhoods, 200

class AllUsers(Resource):
    def get(self):
        users=[user.to_dict() for user in Users.query.all()]
        return users, 200 

class Login(Resource):
    def post(self):
        json = request.get_json()
        email = json.get("email").strip()
        password = json.get("password")

        if not email or not password:
            return {"error": "Email and Password required"}, 400

        user = Users.query.filter(Users.email == email).first()

        if user and user.authenticate(password):
            session["user_id"] = user.id 
            return user.to_dict(), 200
        return {"error": "Invalid email or password"}, 401

class Logout(Resource):
    def delete(self):
        user_id = session.get("user_id")
        if user_id:
            session.pop("user_id")
            print("User logged out successfully")
            return {}, 204 
        return {"message": "Unauthorized"}, 401 

class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = Users.query.filter(Users.id == user_id).first()
            if user:
                return user.to_dict(), 200 
        return {"message": "Unauthorized user"}, 401


class AllTravelers(Resource):
    def get(self):
        travelers=[traveler.to_dict() for traveler in Travelers.query.all()]
        return travelers, 200

class AllBusinesses(Resource):
    def get(self):
        businesses=[business.to_dict() for business in Businesses.query.all()]
        return businesses, 200

class AllIndustries(Resource):
    def get(self):
        industries=[industry.to_dict() for industry in Industry.query.all()]
        return industries, 200

class AllBusinessesIndustries(Resource):
    def get(self):
        businesses_industries=[business_industry.to_dict() for business_industry in BusinessesIndustries.query.all()]
        return businesses_industries, 200

api.add_resource(AllContinents, '/continents')

api.add_resource(AllCountries, '/countries')

api.add_resource(AllStates, '/states')

api.add_resource(AllCities, '/cities')

api.add_resource(AllBoroughs, '/boroughs')

api.add_resource(AllNeighbourhoods, '/neighbourhoods')

api.add_resource(AllUsers, '/users')

api.add_resource(Login, '/login')

api.add_resource(Logout, '/logout')

api.add_resource(CheckSession, '/check_session')

api.add_resource(AllTravelers, '/travelers')

api.add_resource(AllBusinesses, '/businesses')

api.add_resource(AllIndustries, '/industries')

api.add_resource(AllBusinessesIndustries, '/businessesindustries')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
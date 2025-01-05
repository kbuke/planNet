from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from werkzeug.utils import secure_filename

from flask import url_for, send_from_directory

from models import SignUpContainer, SignUpContainerPolaroid, Continents, Country, CountriesContinent, States, Cities, Boroughs, Neighbourhoods, Users, Travelers, Businesses, Industry, BusinessesIndustries, UserVisitedCountry

from datetime import datetime

class AllContainers(Resource):
    def get(self):
        containers=[container.to_dict() for container in SignUpContainer.query.all()]
        return containers, 200

class AllContainerPolaroids(Resource):
    def get(self):
        polaroids=[polaroid.to_dict() for polaroid in SignUpContainerPolaroid.query.all()]
        return polaroids, 200

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
        email = json.get("userEmail").strip()
        password = json.get("userPassword")

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
    
    def post(self):
        json=request.get_json()
        try:
            new_traveler = Travelers(
                email = json.get("email"),
                account_type = json.get("accountType"),
                intro = json.get("intro"),
                country_id = int(json.get("countryId")),
                state_id = int(json.get("stateId")),
                cities_id = int(json.get("cityId")),
                boroughs_id = int(json.get("boroughId")),
                neighbourhoods_id = int(json.get("neighbourhoodId")),
                first_name = json.get("firstName"),
                last_name = json.get("lastName"),
                dob = json.get("dob")
            )
            new_traveler.password_hash = json.get("password")
            db.session.add(new_traveler)
            db.session.commit()
            return new_traveler.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400

class AllBusinesses(Resource):
    def get(self):
        businesses=[business.to_dict() for business in Businesses.query.all()]
        return businesses, 200
    
    def post(self):
        json=request.get_json()
        # breakpoint()
        try:
            new_business = Businesses(
                email=json.get("email"),
                account_type=json.get("accountType"),
                intro=json.get("intro"),
                country_id=json.get("countryId"),
                state_id=json.get("stateId"),
                cities_id=json.get("cityId"),
                boroughs_id=json.get("boroughId"),
                neighbourhoods_id=json.get("neighbourhoodId"),
                business_name=json.get("businessName"),
                opening_time=datetime.strptime(json.get("openingTime"), "%H:%M").time(),
                closing_time=datetime.strptime(json.get("closingTime"), "%H:%M").time(),
                phone_number=json.get("phoneNumber"),
                building_number=json.get("buildingNumber"),
                street_name=json.get("streetName"),
                post_code=json.get("postCode")
            )
            new_business.password_hash=json.get("password")
            db.session.add(new_business)
            db.session.commit()
            return new_business.to_dict(), 201 
        except ValueError as e:
            return {"error": [str(e)]}, 400

class AllIndustries(Resource):
    def get(self):
        industries=[industry.to_dict() for industry in Industry.query.all()]
        return industries, 200

class AllBusinessesIndustries(Resource):
    def get(self):
        businesses_industries=[business_industry.to_dict() for business_industry in BusinessesIndustries.query.all()]
        return businesses_industries, 200

class VisitedCountries(Resource):
    def get(self):
        visited_countries=[visited_country.to_dict() for visited_country in UserVisitedCountry.query.all()]
        return visited_countries, 200
    
    def post(self):
        json=request.get_json()
        try:
            new_visit = UserVisitedCountry(
                user_id=json.get("userId"),
                country_id=json.get("countryId")
            )
            db.session.add(new_visit)
            db.session.commit()
            return new_visit.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400

api.add_resource(AllContainers, '/containers')

api.add_resource(AllContainerPolaroids, '/containerpolaroids')

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

api.add_resource(VisitedCountries, '/visitedcountries')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
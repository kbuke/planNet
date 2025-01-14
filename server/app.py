from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from werkzeug.utils import secure_filename

from flask import url_for, send_from_directory

from models import SignUpContainer, SignUpContainerPolaroid, Continents, Country, CountriesContinent, States, Cities, Boroughs, Neighbourhoods, Users, Travelers, Businesses, Industry, BusinessesIndustries, UserVisitedCountry, UserVisitedState, UserWishListCountry, ProfilePictures

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
    
    def post(self):
        json = request.get_json()
        try:
            new_continent = Continents(
                name = json.get("newContinent"),
                image = json.get("newContinentImg"),
                intro = json.get("newContinentInfo")
            )
            db.session.add(new_continent)
            db.session.commit()
            return new_continent.to_dict(), 201 
        except ValueError as e:
            return {"error": [str(e)]}, 400

class ContinentId(Resource):
    def get(self, id):
        continents = Continents.query.filter(Continents.id == id).first()
        if continents:
            return make_response(continents.to_dict(), 201)
        return {"error": "Continent not found"}
    
    def delete(self, id):
        continents = Continents.query.filter(Continents.id == id).first()
        if continents:
            db.session.delete(continents)
            db.session.commit()
            return{
                "message": "Continent deleted"
            }, 200 
        return {
            "error": "Continent not found"
        }, 404


class AllCountries(Resource):
    def get(self):
        countries=[country.to_dict() for country in Country.query.all()]
        return countries, 200

    def post(self):
        json = request.get_json()
        try:
            new_country = Country(
                name = json.get("countryName"),
                image = json.get("countryImg"),
                safety_level = json.get("countrySafety"),
                intro = json.get("countryInfo"),
                flag = json.get("countryFlag"),
                passport_stamp = json.get("countryPassport")
            )
            db.session.add(new_country)
            db.session.commit()
            return new_country.to_dict(), 201 
        except ValueError as e:
            return {"error": [str(e)]}, 400

class AllContinentsCountries(Resource):
    def get(self):
        countries = [country.to_dict() for country in CountriesContinent.query.all()]
        return countries, 200

    def post(self):
        json = request.get_json()
        breakpoint()
        try:
            new_continent_country = CountriesContinent(
                country_id = int(json.get("newCountryId")),
                continent_id = int(json.get("countriesContinent"))
            )
            db.session.add(new_continent_country)
            db.session.commit()
            return new_continent_country.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400

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

class AllUserId(Resource):
    def get(self, id):
        user_info = Users.query.filter(Users.id==id).first()
        if user_info:
            return user_info.to_dict(), 201 
        return {
            "error": "user not found"
        }
    
    def patch(self, id):
        data=request.get_json()
        user_info = Users.query.filter(Users.id==id).first()
        if user_info:
            try: 
                for attr in data:
                    setattr(user_info, attr, data[attr])
                db.session.add(user_info)
                db.session.commit()
                return make_response(user_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "User not found"
        }, 404

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
    
    def post(self):
        json=request.get_json()
        try:
            new_industry = BusinessesIndustries(
                business_id=json.get("businessId"),
                industry_id=json.get("industryId")
            )
            db.session.add(new_industry)
            db.session.commit()
            return new_industry.to_dict(), 201 
        except ValueError as e:
            return {"error": [str(e)]}, 400

class AllBusinessesIndustriesId(Resource):
    def get(self, id):
        business_industry = BusinessesIndustries.query.filter(BusinessesIndustries.id==id).first()
        if business_industry:
            return make_response(business_industry.to_dict(), 201)
        return {"error": "Relationship not found"}
    
    def delete(self, id):
        business_industry = BusinessesIndustries.query.filter(BusinessesIndustries.id==id).first()
        if business_industry:
            db.session.delete(business_industry)
            db.session.commit()
            return{
                "message": "Businesses industry deleted"
            }, 200 
        return {
            "error": "Relationship not found"
        }, 404

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

class VisitedCountriesId(Resource):
    def get(self, id):
        visitied_countries = UserVisitedCountry.query.filter(UserVisitedCountry.id==id).first()
        if visited_countries:
            return make_response(visited_countries.to_dict(), 201)
        return {"error": "Relationship not found"}
    
    def delete(self, id):
        visited_country=UserVisitedCountry.query.filter(UserVisitedCountry.id==id).first()
        if visited_country:
            db.session.delete(visited_country)
            db.session.commit()
            return{
                "message": "Country visited deleted"
            }, 200 
        return {
            "error": "Relationship not found"
        }, 404

class CountriesWishlist(Resource):
    def get(self):
        wishlist_countries=[wishlist_country.to_dict() for wishlist_country in UserWishListCountry.query.all()]
        return wishlist_countries, 200 
    
    def post(self):
        json=request.get_json()
        try:
            new_wishlist = UserWishListCountry(
                user_id=json.get("userId"),
                country_id=json.get("countryId")
            )
            db.session.add(new_wishlist)
            db.session.commit()
            return new_wishlist.to_dict(), 201 
        except ValueError as e:
            return {"error": [str(e)]}, 400

class CountriesWishlistId(Resource):
    def get(self, id):
        wishlist_country=UserWishListCountry.query.filter(UserWishListCountry.id==id).first()
        if wishlist_country:
            return make_response(wishlist_country.to_dict(), 201)
        return {"error": "Relationship not found"}
    
    def delete(self, id):
        wishlist_country=UserWishListCountry.query.filter(UserWishListCountry.id==id).first()
        if wishlist_country:
            db.session.delete(wishlist_country)
            db.session.commit()
            return{
                "message": "Country wishlist deleted"
            }, 200 
        return {
            "error": "Relationship not found"
        }, 404

class VisitedStates(Resource):
    def get(self):
        visited_states=[visited_state.to_dict() for visited_state in UserVisitedState.query.all()]
        return visited_states, 200
    
    def post(self):
        json=request.get_json()
        try:
            new_visit = UserVisitedState(
                user_id=json.get("userId"),
                state_id=json.get("stateId")
            )
            db.session.add(new_visit)
            db.session.commit()
            return new_visit.to_dict(), 201 
        except ValueError as e:
            return {"error": [str(e)]}, 400

class VisitedStatesId(Resource):
    def get(self, id):
        visited_states=UserVisitedState.query.filter(UserVisitedState.id==id).first()
        if visited_states:
            return make_response(visited_states.to_dict(), 201)
        return {"error": "Relationship not found"}
    
    def delete(self, id):
        visited_states=UserVisitedState.query.filter(UserVisitedState.id==id).first()
        if visited_states:
            db.session.delete(visited_states)
            db.session.commit()
            return {
                "message": "State visited deleted"
            }, 200
        return {
            "error": "Relationship not found"
        }, 404

class ProfilePics(Resource):
    def get(self):
        profile_pic_info = [picture.to_dict() for picture in ProfilePictures.query.all()]
        return profile_pic_info, 200
    
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'avif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class ProfilePicsId(Resource):
    def patch(self, id):
        profile_pic_info = ProfilePictures.query.filter(ProfilePictures.id == id).first()
        if not profile_pic_info:
            return {"error": "Profile picture not found"}, 404
        
        # Check if a file is in the request
        if "image" not in request.files:
            return {"message": "No file part"}, 400

        file = request.files["image"]
        if file.filename == "":
            return {"message": "No selected file"}, 400

        # Check file extension
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)

            # Update picture_route in database with the new file URL
            file_url = url_for('uploaded_file', filename=filename, _external=True)
            profile_pic_info.picture_route = file_url

            db.session.commit()
            return profile_pic_info.to_dict(), 200
        else:
            return {"message": "File type not allowed"}, 400

# Add the route to serve the uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

api.add_resource(AllContainers, '/containers')

api.add_resource(AllContainerPolaroids, '/containerpolaroids')

api.add_resource(AllContinents, '/continents')
api.add_resource(ContinentId, '/continents/<int:id>')

api.add_resource(AllCountries, '/countries')

api.add_resource(AllContinentsCountries, '/continentscountries')

api.add_resource(AllStates, '/states')

api.add_resource(AllCities, '/cities')

api.add_resource(AllBoroughs, '/boroughs')

api.add_resource(AllNeighbourhoods, '/neighbourhoods')

api.add_resource(AllUsers, '/users')
api.add_resource(AllUserId, '/users/<int:id>')

api.add_resource(Login, '/login')

api.add_resource(Logout, '/logout')

api.add_resource(CheckSession, '/check_session')

api.add_resource(AllTravelers, '/travelers')

api.add_resource(AllBusinesses, '/businesses')

api.add_resource(AllIndustries, '/industries')

api.add_resource(AllBusinessesIndustries, '/businessesindustries')
api.add_resource(AllBusinessesIndustriesId, '/businessesindustries/<int:id>')

api.add_resource(VisitedCountries, '/visitedcountries')
api.add_resource(VisitedCountriesId, '/visitedcountries/<int:id>')

api.add_resource(CountriesWishlist, '/countrieswishlist')
api.add_resource(CountriesWishlistId, '/countrieswishlist/<int:id>')

api.add_resource(VisitedStates, '/visitedstates')
api.add_resource(VisitedStatesId, '/visitedstates/<int:id>')

api.add_resource(ProfilePics, '/profilepics')
api.add_resource(ProfilePicsId, '/profilepics/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
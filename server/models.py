from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Time 
from config import db, bcrypt
import re 
from sqlalchemy.ext.hybrid import hybrid_property

#Sign Up Page Container Models
class SignUpContainer(db.Model, SerializerMixin):
    __tablename__="sign_up_containers"

    id=db.Column(db.Integer, primary_key=True)
    background_image=db.Column(db.String, nullable=True)
    tex_background_colour=db.Column(db.String, nullable=False, server_default="")
    title=db.Column(db.String, nullable=False, server_default="")
    text=db.Column(db.String, nullable=False)

    #Set up relations
    polaroids = db.relationship("SignUpContainerPolaroid", backref="containers")

    serialize_rules=(
        "-polaroids.containers",
    )

#Polaroid pictures on sign up containers
class SignUpContainerPolaroid(db.Model, SerializerMixin):
    __tablename__="container_polaroids"

    id=db.Column(db.Integer, primary_key=True)
    polaroid_picture=db.Column(db.String, nullable=False)
    polaroid_text=db.Column(db.String, nullable=False)

    #Set up relations
    container_id=db.Column(db.Integer, db.ForeignKey("sign_up_containers.id"))

#Continent Model
class Continents(db.Model, SerializerMixin):
    __tablename__="continents"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=False, server_default="")

    #Set up relations - a country belongs to a continent (Turkey & Russia have 2 continents)
    countries = db.relationship("CountriesContinent", backref="continent")

    serialize_rules=(
        "-countries.continent",
        "-countries.country.",
    )

#Countries Model - countries belong to a continent
class Country(db.Model, SerializerMixin):
    __tablename__="countries"

    id=db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    safety_level=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=False, server_default="")
    flag=db.Column(db.String, nullable=False, server_default="")
    passport_stamp=db.Column(db.String, nullable=False, server_default="")

    #Set up validation
    ALLOWED_SAFETY_OPTIONS = ("Safe", "Use Caution", "Not Safe")
    @validates("safety_level")
    def validate_safety(self, key, safety):
        if safety in self.ALLOWED_SAFETY_OPTIONS:
            return safety
        raise ValueError(f"Must select an option from safety options")

    #Set up relations
    continents = db.relationship("CountriesContinent", backref="country")
    states = db.relationship("States", backref="country")
    cities = db.relationship("Cities", backref="country")
    users=db.relationship("Users", backref="country")
    visited_users=db.relationship("UserVisitedCountry", backref="country")
    user_wishlist=db.relationship("UserWishListCountry", backref="country")

    serialize_rules=(
        "-continents.country.continents",
        "-continents.country.flag",
        "-continents.country.id",
        "-continents.country.image",
        "-continents.country.intro",
        "-continents.country.passport_stamp",
        "-continents.country.safety_level",
        "-continents.country.states",
        "-continents.country.user_wishlist",
        "-continents.country.visited_users",
        "-continents.continent.countries",
        "-continents.country_id",

        "-states.country",
        "-states.businesses",
        "-states.cities",
        "-states.users",

        "-cities.state",
        "-cities.country",

        "-users",

        "-visited_users.country",
        "-visited_users.user",

        "-user_wishlist.country",
        "-user_wishlist.user",
    )

#Countries Continents Model - set up model that shows which continent(s) a country belongs
class CountriesContinent(db.Model, SerializerMixin):
    __tablename__="countries_continents"

    id=db.Column(db.Integer, primary_key=True)
    country_id=db.Column(db.Integer, db.ForeignKey("countries.id"))
    continent_id=db.Column(db.Integer, db.ForeignKey("continents.id"))


#States Model - states belong to a country
class States(db.Model, SerializerMixin):
    __tablename__="states"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=False, server_default="")

    #Set up relations 
    country_id=db.Column(db.Integer, db.ForeignKey("countries.id"))
    cities = db.relationship("Cities", backref="state")
    users=db.relationship("Users", backref="state")
    visited_users=db.relationship("UserVisitedState", backref="state")

    serialize_rules=(
        "-country.states",
        "-country.continents",
        "-country.businesses",

        "-cities.state",
        "-cities.boroughs",
        "-cities.businesses",

        "-users.state",
        "-users.country",
        "-users.cities",
        "-users.borough",
        "-users.neighbourhood",

        "-visited_users.state",
        "-visited_users.user",
    )
    
    

#Cities Model - cities belong to a state
class Cities(db.Model, SerializerMixin):
    __tablename__="cities"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=False, server_default="")
    country_capital=db.Column(db.Boolean, nullable=False)
    state_capital=db.Column(db.Boolean, nullable=False)

    #Set up relations
    states_id=db.Column(db.Integer, db.ForeignKey("states.id"))
    countries_id=db.Column(db.Integer, db.ForeignKey("countries.id"))
    boroughs = db.relationship("Boroughs", backref="city")
    # businesses=db.relationship("Businesses", backref="cities")
    users=db.relationship("Users", backref="cities")

    serialize_rules=(
        "-state.cities",
        "-state.businesses",
        "-state.country_id",
        "-state.image",

        "-state.country.intro",
        "-state.country.passport_stamp",
        "-state.country.safety_level",

        "-boroughs.city",
        "-boroughs.neighbourhoods",
        "-boroughs.businesses",

        "-users.cities",
        "-users.state",
        "-users.country",
        "-users.borough",
        "-users.neighbourhood",
        "-users.email",
        "-users.boroughs_id",
        "-users.neighbourhoods_id",
        "-users._password_hash",
        "-users.country_id",
        "-users.state_id",
    )

#Towns Model - towns belong in a city
class Boroughs(db.Model, SerializerMixin):
    __tablename__="boroughs"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=False, server_default="")

    #Set up relations
    cities_id=db.Column(db.Integer, db.ForeignKey("cities.id"))
    neighbourhoods = db.relationship("Neighbourhoods", backref="borough")
    # businesses=db.relationship("Businesses", backref="borough")
    users=db.relationship("Users", backref="borough")

    serialize_rules=(
        "-city.boroughs",
        "-city.businesses",

        "-neighbourhoods.borough",
        "-neighbourhoods.businesses",

        "-users.borough",
        "-users.state",
        "-users.country",
        "-users.cities",
        "-users.neighbourhood",
    )

#Neighbourhoods Model - Neighbourhoods belong to Boroughs
class Neighbourhoods(db.Model, SerializerMixin):
    __tablename__="neighbourhoods"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=False, server_default="")

    #Set up relations
    boroughs_id=db.Column(db.Integer, db.ForeignKey("boroughs.id"))
    # businesses=db.relationship("Businesses", backref="neighbourhood")
    users=db.relationship("Users", backref="neighbourhood")

    serialize_rules=(
        "-borough.neighbourhoods",
        "-borough.businesses",

        "-users.neighbourhood",
        "-users.borough",
        "-users.state",
        "-users.country",
        "-users.cities",
    )

#Users Model - can have either user or business
class Users(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    account_type = db.Column(db.String, nullable=False)
    intro = db.Column(db.String, nullable=True)
    initial_signin=db.Column(db.Boolean, default=False)

    country_id = db.Column(db.Integer, db.ForeignKey("countries.id"), nullable=True)
    state_id = db.Column(db.Integer, db.ForeignKey("states.id"), nullable=True)
    cities_id = db.Column(db.Integer, db.ForeignKey("cities.id"), nullable=True)
    boroughs_id = db.Column(db.Integer, db.ForeignKey("boroughs.id"), nullable=True)
    neighbourhoods_id = db.Column(db.Integer, db.ForeignKey("neighbourhoods.id"), nullable=True)
    visited_countries = db.relationship("UserVisitedCountry", backref="user")
    countries_wishlist = db.relationship("UserWishListCountry", backref="user")
    visited_states = db.relationship("UserVisitedState", backref="user")
    profile_picture = db.relationship("ProfilePictures", backref="user", uselist=False)

    serialize_rules=(
        "-country.users",
        "-country.continents",
        "-country.states",
        "-country.visited_users",

        "-state.users",
        "-state.cities",
        "-state.country",
    
        "-cities.users",
        "-cities.boroughs",
        "-cities.state",

        "-borough.users",
        "-borough.neighbourhoods",
        "-borough.city",

        "-neighbourhood.users",
        "-neighbourhood.borough",

        "-visited_countries.user",
        "-visited_countries.country",

        "-countries_wishlist.user",
        "-countries_wishlist.country",

        "-visited_states.user",
        "-visited_states.state",

        "-profile_picture.user",

        "-interests.traveler",
        "-interests.interest.travelers",
    )

    #Password hasing and authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write only attribute")
    
    @password_hash.setter 
    def password_hash(self, password):
        self._password_hash=bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    #Set up validations
    @validates("email")
    def validate_email(self, key, value):
        if '@' and '.' not in value:
            raise ValueError("Please enter a valid email address")
        return value

    type = db.Column(db.String(50))
    __mapper_args__ = {
        "polymorphic_on": type,
        "polymorphic_identity": "user"
    }

    ALLOWED_USERS = ["Admin", "Traveler", "Business"]

    @validates("account_type")
    def validate_user_type(self, key, account_type):
        if account_type not in self.ALLOWED_USERS:
            raise ValueError(f"The account type must be one of {', '.join(self.ALLOWED_USERS)}")
        return account_type

    @staticmethod
    def validate_location_fields(account_type, **kwargs):
        if account_type != "Traveler":
            for field, value in kwargs.items():
                if value is None:
                    raise ValueError(f"{field} must not be null for account type {account_type}")
        return True

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
    
        # Validate location fields based on account_type
        self.validate_location_fields(
            self.account_type,
            country_id=kwargs.get("country_id"),
            state_id=kwargs.get("state_id"),
            cities_id=kwargs.get("cities_id"),
            boroughs_id=kwargs.get("boroughs_id"),
            neighbourhoods_id=kwargs.get("neighbourhoods_id"),
        )
    
        # Set up default profile picture if not provided
        if not self.profile_picture:
            default_picture = ProfilePictures(
                picture_route="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            )
            self.profile_picture = default_picture
            db.session.add(default_picture)  # Add the default picture to the session


#Set up traveler model
class Travelers(Users):
    __tablename__="travelers"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=True)
    dob=db.Column(db.DateTime, nullable=True)

    #Set up relations
    interests=db.relationship("TravelerInterests", backref="traveler")

    __mapper_args__={
        "polymorphic_identity": "Travelers"
    }

#Set up business model
class Businesses(Users):
    __tablename__="businesses"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    
    business_name=db.Column(db.String, nullable=False)
    opening_time=db.Column(db.Time, nullable=False)
    closing_time=db.Column(db.Time, nullable=False)
    phone_number=db.Column(db.String, nullable=False)
    building_number=db.Column(db.String, nullable=False)
    street_name=db.Column(db.String, nullable=False, server_default="")
    post_code=db.Column(db.String, nullable=False)

    #Set up relations
    industries=db.relationship("BusinessesIndustries", backref="business")

    serialize_rules = (
        "-industries.business",
        "-industries.industry",

        "-borough.neighbourhoods",
        "-borough.users",
        "-borough.city",

        "-country.continents",
        "-country.states",

        "-state.users",
        "-state.cities",
        "-state.cities",
        "-state.country",

        "-neighbourhood.borough",
        "-neighbourhood.users",
        "-neighbourhood.borough",

        "-cities.users",
        "-cities.state",
        "-cities.boroughs",

        "-_password_hash",
    )

    #Handle polymorphic relation
    __mapper_args__={
        "polymorphic_identity": "Businesses"
    }

    #Add validation
    @validates("closing_time")
    def validate_closing_time(self, key, closing_time):
        if closing_time >= self.opening_time:
            return closing_time 
        raise ValueError("Closing time can not be before opening time")

#Set up model for (traveler) interests
class Interests(db.Model, SerializerMixin):
    __tablename__="interests"

    id=db.Column(db.Integer, primary_key=True)
    interest=db.Column(db.String, nullable=False, unique=True)
    image=db.Column(db.String, nullable=False, unique=True)

    #Set up relationship
    travelers=db.relationship("TravelerInterests", backref="interest")

#Set up model for traveler interests
class TravelerInterests(db.Model, SerializerMixin):
    __tablename__="traveler_interests"

    id=db.Column(db.Integer, primary_key=True)
    traveler_id=db.Column(db.Integer, db.ForeignKey("travelers.id"))
    interest_id=db.Column(db.Integer, db.ForeignKey("interests.id"))



#Set up model for industries
class Industry(db.Model, SerializerMixin):
    __tablename__="industries"

    id = db.Column(db.Integer, primary_key=True)
    industry = db.Column(db.String, nullable=False, unique=True)

    #Set up validations

    #Set up relationship
    companies = db.relationship("BusinessesIndustries", backref="industry")

    serialize_rules = (
        "-companies.industry",
        "-companies.business",
    )

#Set up model for specific businesses industries
class BusinessesIndustries(db.Model, SerializerMixin):
    __tablename__="business_industries"

    id=db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))
    industry_id = db.Column(db.Integer, db.ForeignKey("industries.id"))


#User Country Wishlist Model
class UserWishListCountry(db.Model, SerializerMixin):
    __tablename__="country_wishlist"

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    country_id=db.Column(db.Integer, db.ForeignKey("countries.id"))

#User Country Visit Model
class UserVisitedCountry(db.Model, SerializerMixin):
    __tablename__="visited_countries"

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    country_id=db.Column(db.Integer, db.ForeignKey("countries.id"))

    serialize_rules=(
        "-country",
        "-user",
    )

#User City Wishlist Model

#User State Visit Model
class UserVisitedState(db.Model, SerializerMixin):
    __tablename__="visited_cities"

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    state_id=db.Column(db.Integer, db.ForeignKey("states.id"))

#Pictures Model
class ProfilePictures(db.Model, SerializerMixin):
    __tablename__="profile_pictures"

    id=db.Column(db.Integer, primary_key=True)

    picture_route=db.Column(db.String, nullable=False, server_default="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg")

    #Add relations
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    serialize_rules=(
        "-user.profile_picture",
    )

#Review Categories Model 


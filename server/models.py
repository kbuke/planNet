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
    background_colour=db.Column(db.String, nullable=True)
    background_image=db.Column(db.String, nullable=False)
    text=db.Column(db.String, nullable=False)

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
        "-countries.country",
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
    businesses=db.relationship("Businesses", backref="country")

    serialize_rules=(
        "-continents.country",
        "-continents.continent",
        "-continents.country_id",

        "-states.country",
        "-states.businesses",
        "-states.cities",

        "-businesses.country",
        "-businesses.states",
        "-businesses.cities",
        "-businesses.borough",
        "-businesses.neighbourhood",
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
    businesses=db.relationship("Businesses", backref="states")

    serialize_rules=(
        "-country.states",
        "-country.continents",
        "-country.businesses",

        "-cities.state",
        "-cities.boroughs",
        "-cities.businesses",

        "-businesses.states",
        "-businesses.country",
        "-businesses.cities",
        "-businesses.borough",
        "-businesses.neighbourhood",
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
    boroughs = db.relationship("Boroughs", backref="city")
    businesses=db.relationship("Businesses", backref="cities")

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

        "-businesses.cities",
        "-businesses.states",
        "-businesses.country",
        "-businesses.borough",
        "-businesses.neighbourhood",
        "-businesses.email",
        "-businesses.boroughs_id",
        "-businesses.neighbourhoods_id",
        "-businesses._password_hash",
        "-businesses.country_id",
        "-businesses.state_id",
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
    businesses=db.relationship("Businesses", backref="borough")

    serialize_rules=(
        "-city.boroughs",
        "-city.businesses",

        "-neighbourhoods.borough",
        "-neighbourhoods.businesses",

        "-businesses.borough",
        "-businesses.states",
        "-businesses.country",
        "-businesses.cities",
        "-businesses.neighbourhood",
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
    businesses=db.relationship("Businesses", backref="neighbourhood")

    serialize_rules=(
        "-borough.neighbourhoods",
        "-borough.businesses",

        "-businesses.neighbourhood",
        "-businesses.borough",
        "-businesses.states",
        "-businesses.country",
        "-businesses.cities",
    )

#Users Model - can have either user or business
class Users(db.Model, SerializerMixin):
    __tablename__="users"

    id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String, nullable=False)
    _password_hash=db.Column(db.String, nullable=False)
    account_type=db.Column(db.String, nullable=False)
    intro=db.Column(db.String, nullable=True)

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
    
    ALLOWED_USERS=["Admin", "Traveler", "Business"]
    @validates("account_type")
    def validate_user_type(self, key, account_type):
        if account_type in self.ALLOWED_USERS:
            return account_type 
        raise ValueError(f"The account type must be one of {', '.join(self.ALLOWED_USERS)}")
    
    #Set up polymorphic identity
    type=db.Column(db.String(50))

    __mapper_args__={
        "polymorphic_on": type,
        "polymorphic_identity": "user" 
    }

#Set up traveler model
class Travelers(Users):
    __tablename__="travelers"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=True)
    origin_country=db.Column(db.String, nullable=True)
    origin_city=db.Column(db.String, nullable=True)
    dob=db.Column(db.DateTime, nullable=True)

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
    country_id=db.Column(db.Integer, db.ForeignKey("countries.id"))
    state_id=db.Column(db.Integer, db.ForeignKey("states.id"))
    cities_id=db.Column(db.Integer, db.ForeignKey("cities.id"))
    boroughs_id=db.Column(db.Integer, db.ForeignKey("boroughs.id"))
    neighbourhoods_id=db.Column(db.Integer, db.ForeignKey("neighbourhoods.id"))
    industries=db.relationship("BusinessesIndustries", backref="business")

    serialize_rules = (
        "-industries.business",
        "-industries.industry",
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

#User Country Visit Model

#User City Wishlist Model

#User City Visit Model

#Pictures Model

#Review Categories Model 


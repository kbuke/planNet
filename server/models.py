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

    serialize_rules=(
        "-continents.country",
        "-continents.continent",
        "-continents.country_id",

        "-states.country",
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

    #Set up relations 
    country_id=db.Column(db.Integer, db.ForeignKey("countries.id"))
    cities = db.relationship("Cities", backref="state")

    serialize_rules=(
        "-country.states",

        "-cities.state",
    )
    
    

#Cities Model - cities belong to a state
class Cities(db.Model, SerializerMixin):
    __tablename__="cities"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)
    country_capital=db.Column(db.Boolean, nullable=False)
    state_capital=db.Column(db.Boolean, nullable=False)

    #Set up relations
    states_id=db.Column(db.Integer, db.ForeignKey("states.id"))

    serialize_rules=(
        "-state.cities",
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
    
    ALLOWED_USERS=["Admin", "Traveler", "Local Business"]
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

# class Businesses(Users):
#     __tablename__="businesses"

#     @declared_attr
#     def id(cls):
#         return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    



#User Country Wishlist Model

#User Country Visit Model

#User City Wishlist Model

#User City Visit Model

#Pictures Model

#Review Categories Model 


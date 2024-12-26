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

    serialize_rules=(
        "-continents. ",
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
    

#Cities Model - cities belong to a state

#Users Model - can have either user or business

#User Country Wishlist Model

#User Country Visit Model

#User City Wishlist Model

#User City Visit Model

#Pictures Model


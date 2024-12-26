from app import app
from config import db 

from datetime import date 

import os 

from models import SignUpContainer, Continents, Country, CountriesContinent

from dotenv import load_dotenv 
load_dotenv()

if __name__ == "__main":
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()
        print("Begin seeding")

        print("Start seeding Continents")
        asia=Continents(
            name="Asia",
            image="https://www.tripsavvy.com/thmb/S6Daq_joeyN3xU0Bz3Qt7QGe0YM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-654013042-28f42fc82c544a9fb0f74458b85de713.jpg"
        )
        db.session.add_all([asia])
        db.session.commit()

        print("Start seeding Countries")
        japan=Country(
            name="Japan",
            image="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
            safety_level="Safe"
        )
        db.session.add_all([japan])
        db.session.commit()

        print("Start seeding continents countries")
        japanAsia=CountriesContinent(
            country_id=1,
            continent_id=1
        )
        db.session.add_all([japanAsia])
        db.session.commit()

        print("Finished seeding")
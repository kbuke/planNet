from app import app
from config import db 

from datetime import date 

import os 

from models import SignUpContainer, Continents, Country, CountriesContinent, States, Cities, Travelers

from dotenv import load_dotenv 
load_dotenv()

if __name__ == "__main__":
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
        europe=Continents(
            name="Europe",
            image="https://img.static-kl.com/images/media/5A8A006F-0618-4245-BBC88553D651B6E2"
        )
        db.session.add_all([asia, europe])
        db.session.commit()

        print("Start seeding Countries")
        japan=Country(
            name="Japan",
            image="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
            safety_level="Safe"
        )
        turkey=Country(
            name="Turkey",
            image="https://res.cloudinary.com/dmxa8n1ci/image/upload/v1708430619/blue_mosque_atrraction_istanbul_holidays_turkey_8d0af0f8ee.jpg",
            safety_level="Safe"
        )
        db.session.add_all([japan, turkey])
        db.session.commit()

        print("Start seeding continents countries")
        japanAsia=CountriesContinent(
            country_id=1,
            continent_id=1
        )
        turkeyAsia=CountriesContinent(
            country_id=2, 
            continent_id=1
        )
        turkeyEurope=CountriesContinent(
            country_id=2,
            continent_id=2
        )
        db.session.add_all([japanAsia, turkeyAsia, turkeyEurope])
        db.session.commit()

        print("Seeding states")
        tokyo=States(
            name="Tokyo",
            image="https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg",
            country_id=1
        )
        db.session.add_all([tokyo])
        db.session.commit()

        print("Seeding cities")
        tokyo_cities=Cities(
            name="Tokyo",
            image="https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg",
            country_capital=True,
            state_capital=True,
            states_id=1
        )
        db.session.add_all([tokyo_cities])
        db.session.commit()

        print("Seeding all travelers")
        kaan_buke=Travelers(
            email="kabuke13@gmail.com",
            account_type="Admin",
            first_name="Kaan",
            last_name="Buke",
            origin_country="UK",
            origin_city="London"
        )
        kaan_buke.password_hash=os.environ.get("kaan_password")
        
        db.session.add_all([kaan_buke])
        db.session.commit()

        print("Finished seeding")
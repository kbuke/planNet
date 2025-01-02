from app import app
from config import db 

from datetime import date 
from datetime import time

import os 

from models import SignUpContainer, SignUpContainerPolaroid, Continents, Country, CountriesContinent, States, Cities, Boroughs, Neighbourhoods, Travelers, Businesses, Industry, BusinessesIndustries

from dotenv import load_dotenv 
load_dotenv()

if __name__ == "__main__":
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()
        print("Begin seeding")

        print("Start seeding sign up containers")
        container1=SignUpContainer(
            background_image="https://i.ibb.co/r35G5p4/DJI-0181.jpg",
            tex_background_colour="rgba(44, 59, 193)",
            title="Follow Fellow Travelers and Businesses",
            text="Plan-Net allows you to follow registered travelers to keep up to date with their own experiences, as well as to help inspire your next trip.\n You can also follow businesses to track any updates they may have to share, be it events, altered timetables and more.\n Read blogs and reviews of those you follow as well as see any new pictures they may upload.",
        )
        container2=SignUpContainer(
            background_image="https://i.ibb.co/7yZh5rm/DSC00470-2.jpg",
            tex_background_colour="rgb(8, 143, 143)",
            title="Follow, Review, and Bookmark Businesses",
            text="Follow businesses from anywhere in the world, and keep up to date with any news they wish to share. \n Read reviews from fellow travelers about their own experiences at the establishment, as well as any pictures taken there. \n If you are sold on this restaraunt, hotel, museum etc add it to your wishlist so you don't forget where it is, and make sure to visit when you're in town.",
        )
        container3=SignUpContainer(
            background_image="https://i.ibb.co/VQYN7x4/KDB7619-1-min.jpg",
            tex_background_colour="rgb(8, 143, 143)",
            title="Rate Continents, Countries, States, Cities Based on Certain Categories",
            text="You can rate continents, countries and cities based on certain categories to help fellow travelers filter locations based on individual preferances. \n Example categories are wildlife, history, beaches etc. \n As an example you could rate the country of Italy 5⭐️'s for History and Food, but a 1⭐️ for wildlife"
        )
        db.session.add_all([container1, container2, container3])
        db.session.commit()

        print("Start seeding Continents")
        asia=Continents(
            name="Asia",
            image="https://www.tripsavvy.com/thmb/S6Daq_joeyN3xU0Bz3Qt7QGe0YM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-654013042-28f42fc82c544a9fb0f74458b85de713.jpg",
            intro="The larges and most populated continent in the world."
        )
        europe=Continents(
            name="Europe",
            image="https://img.static-kl.com/images/media/5A8A006F-0618-4245-BBC88553D651B6E2",
            intro="Home of the Renaisance and Industrial revolution."
        )
        db.session.add_all([asia, europe])
        db.session.commit()

        print("Start seeding Countries")
        japan=Country(
            name="Japan",
            image="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
            safety_level="Safe",
            intro="Land of the rising sun, and home of the fierce warriors the Samurai",
            flag="https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
            passport_stamp="https://i.etsystatic.com/8157817/r/il/8a171c/2370221133/il_570xN.2370221133_jdr9.jpg"
        )
        turkey=Country(
            name="Turkey",
            image="https://res.cloudinary.com/dmxa8n1ci/image/upload/v1708430619/blue_mosque_atrraction_istanbul_holidays_turkey_8d0af0f8ee.jpg",
            safety_level="Safe",
            intro="Home of the Ottoman Empire, and some of the oldest architecture in the world.",
            flag="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png",
            passport_stamp="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4OTu3RuSRlm5jPYfAIhbctCoPS31q2RWG1w&s"
        )
        uk=Country(
            name="UK",
            image="https://www.travelandleisure.com/thmb/aU-uN5KmNaSwwLEXStXHGYY8Lwk=/1500x0/filters:no_upscale():max_bytes(200000):strip_icc()/london-cityscape-UKESSAY1222-3c3b4b23062f410080b77839b31243a6.jpg",
            safety_level="Safe",
            intro="The UK is made up of four countries; England, Northern Ireland, Scotland, and Wales. It is the home of fry-ups and fish and chips.",
            flag="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
            passport_stamp="https://www.shutterstock.com/image-illustration/uk-passport-stamp-united-kingdom-260nw-1616834101.jpg"
        )
        db.session.add_all([japan, turkey, uk])
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
        ukEurope=CountriesContinent(
            country_id=3,
            continent_id=2
        )
        db.session.add_all([japanAsia, turkeyAsia, turkeyEurope, ukEurope])
        db.session.commit()

        print("Seeding states")
        tokyo=States(
            name="Tokyo",
            image="https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg",
            country_id=1,
            intro="The smallest prefecture of the country, but the biggest and most populated city in the world."
        )
        greater_london=States(
            name="Greater London",
            image="https://evanevanstours.com/blog/wp-content/uploads/2019/07/city-of-london.jpg",
            country_id=3,
            intro="The capital of England is its own borough."
        )
        db.session.add_all([tokyo, greater_london])
        db.session.commit()

        print("Seeding cities")
        tokyo_cities=Cities(
            name="Tokyo",
            image="https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg",
            country_capital=True,
            state_capital=True,
            states_id=1,
            intro="The capital of Japan, and the largest and most populated city in the world."
        )
        london=Cities(
            name="London",
            image="https://media.cntraveller.com/photos/66015c3f3db9bb835d98584a/16:9/w_2240,c_limit/GettyImages-1464758942.jpg",
            country_capital=True,
            state_capital=True,
            states_id=2,
            intro="The capital of England"
        )
        db.session.add_all([tokyo_cities, london])
        db.session.commit()

        print("Seeding Boroughs")
        shibuya=Boroughs(
            name="Shibuya",
            image="https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/4/2024/03/pixta_92675153_M.jpg",
            intro="Home of the busiest crossing in the world",
            cities_id=1
        )
        richmond=Boroughs(
            name="Richmond",
            image="https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2019/11/GettyImages-886370192_353881512_583992352-e1573040033502.jpg",
            intro="Home of the ficticious Richmond F.C. from Ted Lasso",
            cities_id=2
        )
        db.session.add_all([shibuya, richmond])
        db.session.commit()

        print("Seeding Neighbourhoods")
        harajuku=Neighbourhoods(
            name="Harajuku",
            image="https://assets.vogue.com/photos/649c9d3d55936ebc9367abe3/16:9/w_2990,h_1682,c_limit/Vogue-SA-09-0-0K7A0303%20copy.jpg",
            intro="A neighbourhood in the busy Shibuya Ward in Tokyo.",
            boroughs_id=1
        )
        hampton=Neighbourhoods(
            name="Hampton",
            image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/e7/b1/f9/garrick-s-temple-to-shakespear.jpg?w=1000&h=1000&s=1",
            intro="A small village at the very end of South West London",
            boroughs_id=2
        )
        db.session.add_all([harajuku, hampton])
        db.session.commit()

        print("Seeding all travelers")
        kaan_buke=Travelers(
            email="kabuke13@gmail.com",
            account_type="Admin",
            first_name="Kaan",
            last_name="Buke",
            country_id=3,
            state_id=2,
            cities_id=2,
            boroughs_id=2,
            neighbourhoods_id=2
            # origin_country="UK",
            # origin_city="London"
        )
        kaan_buke.password_hash=os.environ.get("kaan_password")
        db.session.add_all([kaan_buke])
        db.session.commit()

        print("Seeding all businesses")
        millenials_shibuya=Businesses(
            email="millenials@gmail.com",
            account_type="Business",
            intro="A hotel in the heart of Shibuya",
            business_name="",
            opening_time=time(0, 0),
            closing_time=time(0, 0),
            phone_number= "+81 50-3164-0748",
            building_number="1",
            street_name="Chome-20-13 Jinnan",
            post_code="150-0041",
            country_id=1,
            state_id=1,
            cities_id=1,
            boroughs_id=1,
            neighbourhoods_id=1
        )
        millenials_shibuya.password_hash="milenial13"
        db.session.add_all([millenials_shibuya])
        db.session.commit()

        print("Seeding Industries")
        hotel=Industry(
            industry="Hotel"
        )
        db.session.add_all([hotel])
        db.session.commit()

        print("Seeding businesses industries")
        millenial_hotel = BusinessesIndustries(
            business_id = 1,
            industry_id = 1
        )
        db.session.add_all([millenial_hotel])
        db.session.commit()

        print("Finished seeding")
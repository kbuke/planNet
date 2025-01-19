from app import app
from config import db 

from datetime import date 
from datetime import time

import os 

from models import SignUpContainer, SignUpContainerPolaroid, Continents, Country, CountriesContinent, States, Cities, Boroughs, Neighbourhoods, Travelers, Businesses, Industry, BusinessesIndustries, UserVisitedCountry

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
            image="https://globalhelpswap.com/wp-content/uploads/2020/05/Asia-Travel-Guide-1024x677.jpg",
            intro="The larges and most populated continent in the world."
        )
        europe=Continents(
            name="Europe",
            image="https://img.static-kl.com/images/media/5A8A006F-0618-4245-BBC88553D651B6E2",
            intro="Home of the Renaisance and Industrial revolution."
        )
        africa=Continents(
            name="Africa",
            image="https://www.nationalgeographic.com/content/dam/expeditions/destinations/africa/hero-africa-elephants.jpg",
            intro="The continent with the best wildlife and most countries."
        )
        north_america=Continents(
            name="North America",
            image="https://about-the-usa.com/images/about-usa.jpg",
            intro="America hell yeah"
        )
        south_america=Continents(
            name="South America",
            image="https://www.andbeyond.com/wp-content/uploads/sites/5/Lama-and-Machu-Picchu-in-Peru-in-South-America.jpg",
            intro="Good food, great people"
        )
        australia_continent=Continents(
            name="Australia",
            image="https://www.explore.com/img/gallery/this-stunning-australian-beach-is-the-top-ranked-beach-in-the-world/l-intro-1697463911.jpg",
            intro="Smallest continent"
        )
        db.session.add_all([asia, europe, africa, north_america, south_america, australia_continent])
        db.session.commit()

        print("Start seeding Countries")
        japan=Country(
            name="Japan",
            image="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
            safety_level="Safe",
            intro="Land of the rising sun, and home of the fierce warriors the Samurai",
            flag="https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
            passport_stamp="https://i.ibb.co/kM70FNB/Japan.png"
        )
        turkey=Country(
            name="Turkey",
            image="https://res.cloudinary.com/dmxa8n1ci/image/upload/v1708430619/blue_mosque_atrraction_istanbul_holidays_turkey_8d0af0f8ee.jpg",
            safety_level="Safe",
            intro="Home of the Ottoman Empire, and some of the oldest architecture in the world.",
            flag="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png",
            passport_stamp="https://i.ibb.co/pjsW5vQ/Turkey.png"
        )
        uk=Country(
            name="UK",
            image="https://news.virginia.edu/sites/default/files/article_image/brexit_header.jpg",
            safety_level="Safe",
            intro="The UK is made up of four countries; England, Northern Ireland, Scotland, and Wales. It is the home of fry-ups and fish and chips.",
            flag="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
            passport_stamp="https://i.ibb.co/KKPfkXD/UK.png"
        )
        italy=Country(
            name="Italy",
            image="https://assets.voxcity.com/uploads/blog_images/Iconic%20Landmarks%20in%20Rome_original.jpg",
            safety_level="Safe",
            intro="Home of the Roman Empire, as well as some of the best food in the world.",
            flag="https://content.app-sources.com/s/39330979433008693/uploads/Country_Flags/Flag_of_Italy.svg-0896525.png?format=webp",
            passport_stamp="https://i.ibb.co/0rzhQWS/10.png"
        )
        netherlands=Country(
            name="Netherlands",
            image="https://www.lelongweekend.com/wp-content/uploads/2023/10/LLW-Amsterdam-scaled.jpeg",
            safety_level="Safe",
            intro="Land of windmills and tulips",
            flag="https://myflag.com.au/wp-content/uploads/netherlands-national-flag.jpg",
            passport_stamp="https://i.ibb.co/mbfdtdL/13.png"
        )
        macedonia=Country(
            name="North Macedonia",
            image="https://www.belmondo-travel.com/upld/xl/761/north-macedonia-tours-jovan-kaneo-church-in-ohrid-in-a-beautiful-summer-day.webp",
            safety_level="Safe",
            intro="Home of Alexander the Great.",
            flag="https://cdn.britannica.com/08/6208-050-930F76BA/Flag-North-Macedonia.jpg",
            passport_stamp="https://i.ibb.co/yp6FJKD/18.png"
        )
        argentina=Country(
            name="Argentina",
            image="https://vamospanish.com/wp-content/uploads//live-in-buenos-aires.jpg",
            safety_level="Safe",
            intro="Known for its beef, and football legends.",
            flag="https://blueflag.co.za/cdn/shop/products/Argentina_1_1200x1200.jpg?v=1667253522",
            passport_stamp="https://i.ibb.co/47Y6tsY/argentina.png"
        )
        china=Country(
            name="China",
            image="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_245773270v2.jpg",
            safety_level="Safe",
            intro="One of the oldest cultures in the world, China really stands the test of time.",
            flag="https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg",
            passport_stamp="https://i.ibb.co/jfswdLk/china.png"
        )
        south_korea=Country(
            name="South Korea",
            image="https://www.agoda.com/wp-content/uploads/2024/08/Namsan-Tower-during-autumn-in-Seoul-South-Korea.jpg",
            safety_level="Safe",
            intro="A country with a sad history, it has reinvented itself with its television and music.",
            flag="https://static3.depositphotos.com/1003711/191/i/950/depositphotos_1919144-stock-photo-flag-of-south-korea.jpg",
            passport_stamp="https://i.ibb.co/VjqCcmS/South-Korea.png"
        )
        australia=Country(
            name="Australia",
            image="https://greatbarrierreefliveaboards.com/files/2013/11/great-barrier-reef-coral-turtles-1.jpg",
            safety_level="Safe",
            intro="The land down under, with very diverse wildlife, and some of the best surfing spots",
            flag="https://cdn.britannica.com/78/6078-050-18D5DEFE/Flag-Australia.jpg",
            passport_stamp="https://i.ibb.co/ggJxdQ6/australia.png"
        )
        botswana=Country(
            name="Botswana",
            image="https://ik.imgkit.net/3vlqs5axxjf/TAW/uploadedImages/All_Destinations/AFME/Africa_-_Middle_East/botswanasafarichobe.jpg?tr=w-1200%2Cfo-auto",
            safety_level="Safe",
            intro="Home to the Okavanga Delta, and Chobe Park.",
            flag="https://cdn11.bigcommerce.com/s-hhbbk/products/181/images/35976/BOTS0001__06068.1580483000.500.750.png?c=2",
            passport_stamp="https://i.ibb.co/Vt8rTvW/Botswana.png"
        )
        brazil=Country(
            name="Brazil",
            image="https://www.thetimes.com/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc0bdc5e1-c684-446b-8e0d-876c6756da27.jpg?crop=2531%2C1687%2C235%2C0",
            safety_level="Use Caution",
            intro="Famous for its street party Carnival, as well as one of the seven wonders of the world.",
            flag="https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            passport_stamp="https://i.ibb.co/Qv7jppT/Brazil.png"
        )
        columbia=Country(
            name="Columbia",
            image="https://www.colombia-travels.com/wp-content/uploads/adobestock-266299444-1-1280x800.jpeg",
            safety_level="Use Caution",
            intro="Large country",
            flag="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/2560px-Flag_of_Colombia.svg.png",
            passport_stamp="https://i.ibb.co/PZK9Lgr/Columbia.png"
        )
        denmark=Country(
            name="Denmark",
            image="https://imageio.forbes.com/specials-images/imageserve/64845748e7473b7e3c750fc7/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            safety_level="Safe",
            intro="Home of Lego",
            flag="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMD7mUigrxGB7pF8MTxdTQGr2qwLLjUlFj9Q&s",
            passport_stamp="https://i.ibb.co/Yy5dVd4/Denmark.png"
        )
        egypt=Country(
            name="Egypt",
            image="https://image.jimcdn.com/app/cms/image/transf/dimension=1040x10000:format=jpg/path/s2217cd0bb1220415/image/i0aa51da086cc095c/version/1695120184/a-towering-view-of-the-great-pyramid-of-giza-with-a-silhouette-of-a-camel-and-its-rider-in-the-foreground.jpg",
            safety_level="Use Caution",
            intro="Home of pyramids, deserts and the nile river.",
            flag="https://cdn.britannica.com/85/185-050-6A8E2E8A/Flag-Egypt.jpg",
            passport_stamp="https://i.ibb.co/BCMNjDj/Egypt.png"
        )
        france=Country(
            name="France",
            image="https://www.state.gov/wp-content/uploads/2023/07/shutterstock_667548661v2.jpg",
            safety_level="Safe",
            intro="Landmarks, and food",
            flag="https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg",
            passport_stamp="https://i.ibb.co/1LHrXTL/France.png"
        )
        germany=Country(
            name="Germany",
            image="https://internationalliving.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fwv75stsetqy3%2F5SLxbxZ11GmYsjFHSL5kWC%2F42cee1a3d15cfb3851f20e2e057583bf%2FGermany_Country_Guide.jpg%3Fq%3D60%26fit%3Dfill%26fm%3Dwebp&w=3840&q=60",
            safety_level="Safe",
            intro="A country of varied history, and beautiful landscapes.",
            flag="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png",
            passport_stamp="https://i.ibb.co/ftZNRYM/Germany.png"
        )
        hungary=Country(
            name="Hungary",
            image="https://lp-cms-production.imgix.net/2023-03/GettyRF_473481530.jpg",
            safety_level="Safe",
            intro="A very nice country",
            flag="https://cdn.britannica.com/55/1455-004-5897143C/Flag-Hungary.jpg",
            passport_stamp="https://i.ibb.co/rFpRL09/Hungary.png"
        )
        india=Country(
            name="India",
            image="https://www.onthegotours.com/repository/The-Taj-Mahal-with-brightly-coloured-women-looking-over-the-water-90851274464192.jpg",
            safety_level="Use Caution",
            intro="Second most populated coubtry.",
            flag="https://cdn.vectorstock.com/i/500p/45/74/national-flag-of-india-vector-1434574.jpg",
            passport_stamp="https://i.ibb.co/R7VKMCk/India.png"
        )
        indonesia=Country(
            name="Indonesia",
            image="https://www.rjtravelagency.com/wp-content/uploads/2023/09/Indonesia.jpg",
            safety_level="Use Caution",
            intro="Some of the oldest records of humanity",
            flag="https://cdn.britannica.com/48/1648-050-9C1F365D/Flag-Indonesia.jpg",
            passport_stamp="https://i.ibb.co/4VPzwKK/Indonesia.png"
        )
        ireland=Country(
            name="Ireland",
            image="https://i.natgeofe.com/n/c13339d3-0faf-4297-81d0-424c19e80096/rock-of-cashel-ireland_3x2.jpg",
            safety_level="Safe",
            intro="Home of mythical tales and creatures, and a good pint of Guiness",
            flag="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQly-3QFvlB8KrWezMv7bjpnybHxbxLdJCv4Q&s",
            passport_stamp="https://i.ibb.co/BZLydyw/Ireland.png"
        )
        kenya=Country(
            name="Kenya",
            image="https://ajkenyasafaris.com/wp-content/uploads/2023/05/kenya-cultures-and-traditions-bg1.webp",
            safety_level="Safe",
            intro="Home to the Masai Marai.",
            flag="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhuI6mlma4zg1WO0_yHsdYJUZG-6TFbH-5lQ&s",
            passport_stamp="https://i.ibb.co/djv5r3G/Kenya.png"
        )
        mongolia=Country(
            name="Mongolia",
            image="https://nomadsland.travel/sites/default/files/styles/hero_full_width/public/2024-04/fadhil-abhimantra-uuw3cwv5op0-unsplash.jpg.webp?itok=Ua23b0Yr",
            safety_level="Safe",
            intro="Home to furious warriors.",
            flag="https://cdn.britannica.com/56/2756-050-31955A5E/Flag-Mongolia.jpg",
            passport_stamp="https://i.ibb.co/2q1DQ21/Mongolia.png"
        )
        new_zealand=Country(
            name="New Zealand",
            image="https://cdn.britannica.com/68/179868-138-F4FC616A/Overview-discussion-Southern-Alps-warming-New-Zealand.jpg?w=800&h=450&c=crop",
            safety_level="Safe",
            intro="The filming location of Lord of the Rings.",
            flag="https://cdn.britannica.com/17/3017-050-CD9032F3/Flag-New-Zealand.jpg",
            passport_stamp="https://i.ibb.co/KqqVwMr/New-Zealand.png"
        )
        peru=Country(
            name="Peru",
            image="https://cdn.britannica.com/78/189878-050-D673E81F/llama-ruins-Peru-Machu-Picchu.jpg",
            safety_level="Safe",
            intro="Home of Machu Pichu",
            flag="https://cdn.britannica.com/48/3448-050-1EFC8CF3/Flag-Peru.jpg",
            passport_stamp="https://i.ibb.co/9q5fDPL/Peru.png"
        )
        poland=Country(
            name="Poland",
            image="https://lp-cms-production.imgix.net/2022-08/poland-iStock-498559006-RFC.jpeg?fit=crop&w=3840&auto=format&q=75",
            safety_level="Safe",
            intro="A rich history of resiliance",
            flag="https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
            passport_stamp="https://i.ibb.co/6twT2HC/Poland.png"
        )
        south_africa=Country(
            name="South Africa",
            image="https://www.cchotels.co.za/wp-content/uploads/2024/10/city-with-mountain-background-city-background-1100x733.jpg",
            safety_level="Use Caution",
            intro="The rainbow nation, where this app was made.",
            flag="https://cdn.britannica.com/27/4227-050-00DBD10A/Flag-South-Africa.jpg",
            passport_stamp="https://i.ibb.co/s6zQGhQ/South-Africa.png"
        )
        spain=Country(
            name="Spain",
            image="https://entiretravel.imgix.net/getmedia/22c335e1-f6ff-41f0-8972-15c8d9b711ad/Spain-842x469.jpg?auto=format",
            safety_level="Safe",
            intro="A nice country",
            flag="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87zGBZeO3uhPHKetXvPlTQAn37b_u-RvZOA&s",
            passport_stamp="https://i.ibb.co/HKpJDhK/Spain.png"
        )
        tanzania=Country(
            name="Tanzania",
            image="https://cdn.britannica.com/34/153434-050-863E8023/Mount-Kilimanjaro-Tanzania.jpg",
            safety_level="Safe",
            intro="Home of Kilimanjaro",
            flag="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Z_zh2x8VI5KGYeJ0fOMewhOqohKxBoPi9g&s",
            passport_stamp="https://i.ibb.co/kypt7Xc/Tanzania.png"
        )
        thailand=Country(
            name="Thailand",
            image="https://images.ctfassets.net/wv75stsetqy3/DaKdXY2tkQGWeVQiCbSx7/ac01166282697e4e0cafb99180d35cd1/Thailand_Featured.jpg?q=60&fit=fill&fm=webp",
            safety_level="Use Caution",
            intro="Very beautiful",
            flag="https://cdn.britannica.com/38/4038-050-BDDBA6AB/Flag-Thailand.jpg",
            passport_stamp="https://i.ibb.co/kypt7Xc/Tanzania.png"
        )
        uganda=Country(
            name="Uganda",
            image="https://i.ibb.co/VQYN7x4/KDB7619-1-min.jpg",
            safety_level="Use Caution",
            intro="Primates galore",
            flag="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfeM8N_Lm2G5_Duk-2Pef78qfA4I3JnL7aAA&s",
            passport_stamp="https://i.ibb.co/YD1X1FL/Uganda.png"
        )
        usa=Country(
            name="USA",
            image="https://www.worldatlas.com/r/w1300/upload/f4/d8/7b/shutterstock-1397031029.jpg",
            safety_level="Use Caution",
            intro="Monuments everywhere",
            flag="https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg",
            passport_stamp="https://i.ibb.co/Jp9GP5V/USA.png"
        )
        vietnam=Country(
            name="Vietnam",
            image="https://www.thebrenthurstfoundation.org/uploads/0f39e8a2-9148-4623-896c-10adb7c4cc92.jpg",
            safety_level="Safe",
            intro="A country with cool history",
            flag="https://cdn.britannica.com/41/4041-004-D051B135/Flag-Vietnam.jpg",
            passport_stamp="https://i.ibb.co/jzzbtf3/Vietnam.png"
        )
        db.session.add_all([
            japan, turkey, uk, italy, netherlands, 
            macedonia, argentina, china,
            south_korea, australia, botswana, brazil,
            columbia, denmark, egypt, france, germany,
            hungary, india, indonesia, ireland, kenya,
            mongolia, new_zealand, peru, poland, south_africa,
            spain, tanzania, thailand, uganda, usa, vietnam
        ])
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
        italyEurope=CountriesContinent(
            country_id=3,
            continent_id=2
        )
        netherlandsEurope=CountriesContinent(
            country_id=5,
            continent_id=2
        )
        macedoniaEurope=CountriesContinent(
            country_id=6,
            continent_id=2
        )
        argentinaSouthAmerica=CountriesContinent(
            country_id=7,
            continent_id=5
        )
        chinaAsia=CountriesContinent(
            country_id=8,
            continent_id=1
        )
        koreaAsia=CountriesContinent(
            country_id=9,
            continent_id=1
        )
        australiaAustralis=CountriesContinent(
            country_id=10,
            continent_id=6
        )
        botswanaAfrica=CountriesContinent(
            country_id=11,
            continent_id=3
        )
        brazilSouthAmerica=CountriesContinent(
            country_id=12,
            continent_id=5
        )
        columbiaSouthAmerica=CountriesContinent(
            country_id=13,
            continent_id=5
        )
        denmarkEurope=CountriesContinent(
            country_id=14,
            continent_id=2
        )
        egyptAfrica=CountriesContinent(
            country_id=15,
            continent_id=3
        )
        franceEurope=CountriesContinent(
            country_id=16,
            continent_id=2
        )
        germanyEurope=CountriesContinent(
            country_id=17,
            continent_id=2
        )
        hungaryEurope=CountriesContinent(
            country_id=18,
            continent_id=2
        )
        indiaAsia=CountriesContinent(
            country_id=19,
            continent_id=1
        )
        indonesiaAsia=CountriesContinent(
            country_id=20,
            continent_id=1
        )
        irelandEurope=CountriesContinent(
            country_id=21,
            continent_id=2
        )
        kenyaAfrica=CountriesContinent(
            country_id=22,
            continent_id=3
        )
        mongoliaAsia=CountriesContinent(
            country_id=23,
            continent_id=1
        )
        newZealandAustralia=CountriesContinent(
            country_id=24,
            continent_id=6
        )
        peruSouthAmerica=CountriesContinent(
            country_id=25,
            continent_id=5
        )
        polandEurope=CountriesContinent(
            country_id=26,
            continent_id=2
        )
        southAfricaAfrica=CountriesContinent(
            country_id=27,
            continent_id=3
        )
        spainEurope=CountriesContinent(
            country_id=28,
            continent_id=2
        )
        tanzaniaAfrica=CountriesContinent(
            country_id=29,
            continent_id=3
        )
        thailandAsia=CountriesContinent(
            country_id=30,
            continent_id=1
        )
        ugandaAfrica=CountriesContinent(
            country_id=31,
            continent_id=3
        )
        usaNorthAmerica=CountriesContinent(
            country_id=32,
            continent_id=4
        )
        vietnamAsia=CountriesContinent(
            country_id=33,
            continent_id=1
        )
        db.session.add_all([
            japanAsia, turkeyAsia, turkeyEurope, ukEurope, italyEurope,
            netherlandsEurope, macedoniaEurope, argentinaSouthAmerica, chinaAsia, koreaAsia,
            australiaAustralis, botswanaAfrica, brazilSouthAmerica, columbiaSouthAmerica,
            denmarkEurope, egyptAfrica, franceEurope, germanyEurope, 
            hungaryEurope, indiaAsia, indonesiaAsia, irelandEurope, kenyaAfrica,
            mongoliaAsia, newZealandAustralia, peruSouthAmerica, polandEurope,
            southAfricaAfrica, spainEurope, tanzaniaAfrica, thailandAsia,
            ugandaAfrica, usaNorthAmerica, vietnamAsia
        ])
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
        restaraunt=Industry(
            industry="Restaraunt"
        )
        db.session.add_all([hotel, restaraunt])
        db.session.commit()

        print("Seeding businesses industries")
        millenial_hotel = BusinessesIndustries(
            business_id = 1,
            industry_id = 1
        )
        db.session.add_all([millenial_hotel])
        db.session.commit()

        print("Seeding users visited countries")
        user1_japan = UserVisitedCountry(
            user_id=1,
            country_id=1
        )
        user1_turkey = UserVisitedCountry(
            user_id=1,
            country_id=2
        )
        db.session.add_all([user1_japan, user1_turkey])
        db.session.commit()

        print("Finished seeding")
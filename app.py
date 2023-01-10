import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,func
from flask import Flask,jsonify, render_template
import pandas as pd
from config import db_url

#################################################
# Database Setup
#################################################
engine = create_engine(f'{db_url}')
connection = engine.connect()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine,reflect=True)

# Save reference to the table
Sighting = Base.classes.sighting

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
# Home route
@app.route("/")
# def Welcome():
#     return(
#         f"<b>Welcome</b>"
#     )
def index():
    return render_template("index.html", pages={
        "index": "active",
        "sightings_map": "",
        "sightings_trends": "",
        "ufo shapes": ""
    })

@app.route("/sightings_map/")
def sightings_map():
    return render_template("Sightings_Map.html", pages={
        "home": "",
        "sightings_map": "active",
        "sightings_trends": "",
        "ufo shapes": ""
    })

@app.route("/sightings_trends/")
def sightings_trends():
    return render_template("Sightings_Trends.html", pages={
        "home": "",
        "sightings_map": "",
        "sightings_trends": "active",
        "ufo shapes": ""
    })

@app.route("/ufo_shapes/")
def ufo_shapes():
    return render_template("UFO_shapes.html", pages={
        "home": "",
        "sightings_map": "",
        "sightings_trends": "",
        "ufo shapes": "active"
    })

# Sightings route
@app.route("/api/v1.0/sightings/")
def sightings():
     # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all sightings
    sightings_data = session.query(Sighting.date,Sighting.city,Sighting.state,Sighting.country,Sighting.shape,Sighting.duration,
                                   Sighting.summary,Sighting.posted,Sighting.images,Sighting.reportnum,Sighting.location,Sighting.latitude,
                                   Sighting.longitude).all()
    # print(sightings_data[0])
    session.close()


    sightings_list = []


    for sight in sightings_data:
        sightings_dict={}
        coordinates_dict={}
        sightings_dict["Report Num"]= sight.reportnum
        sightings_dict["Date"]= sight.date
        sightings_dict["City"]= sight.city
        sightings_dict["State"]= sight.state
        sightings_dict["Country"]= sight.country
        sightings_dict["Shape"]= sight.shape
        sightings_dict["Duration"]= sight.duration
        sightings_dict["Summary"]= sight.summary
        sightings_dict["Posted Date"]= sight.posted
        sightings_dict["Images"]= sight.images
        sightings_dict["Location"]= sight.location
        coordinates_dict["Latitude"]=sight.latitude
        coordinates_dict["Longitude"]=sight.longitude
        # sightings_dict["Coordinates"]=[sight.latitude,sight.longitude]
        sightings_dict["Coordinates"]=coordinates_dict
        sightings_list.append(sightings_dict)
        
    return jsonify(sightings_list)

# app.run statement
if __name__ == '__main__':
    app.run(debug=True)
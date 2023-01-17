import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,func
from flask import Flask,jsonify, render_template, url_for
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
State = Base.classes.states
Month = Base.classes.months
Hour = Base.classes.hours

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
        "Home": "active",
        "Sightings_Map": "",
        "Sightings_Trends": "",
        "UFO_Shapes": ""
    })

@app.route("/Sightings_Map/")
def sightings_map():
    return render_template("Sightings_Map.html", pages={
        "Home": "",
        "Sightings_Map": "active",
        "Sightings_Trends": "",
        "UFO_Shapes": ""
    })

@app.route("/Sightings_Trends/")
def sightings_trends():
    return render_template("Sightings_Trends.html", pages={
        "Home": "",
        "Sightings_Map": "",
        "Sightings_Trends": "active",
        "UFO_Shapes": ""
    })

@app.route("/UFO_shapes/")
def ufo_shapes():
    return render_template("UFO_Shapes.html", pages={
        "Home": "",
        "Sightings_Map": "",
        "Sightings_Trends": "",
        "UFO_Shapes": "active"
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

    # for _ in sightings_data:
    #     print(dict(_))
    # sightings_list = [dict(_) for _ in sightings_data]
    # return jsonify(sightings_list)

    sightings_list=[]
    for sight in sightings_data:
        # print(dict(sight))
        sightings_dict={}
        coordinates_dict=[]
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
        # coordinates_dict["lat"]=sight.latitude
        # coordinates_dict["lng"]=sight.longitude
        # sightings_dict["Coordinates"]=[sight.latitude,sight.longitude]
        coordinates_dict.append(sight.latitude)
        coordinates_dict.append(sight.longitude)
        sightings_dict["coordinates"]=coordinates_dict
        sightings_list.append(sightings_dict)
        
    return jsonify(sightings_list)

@app.route("/api/v1.0/sightingsbystate/")
def sightings_state():
      # Create our session (link) from Python to the DB
    session = Session(engine)

    state_data = session.query(State.id,State.state,State.sightings).all()

    session.close()

    state_list=[]
    for data in state_data:
        state_dict={}
        # state_dict["Id"]=data.id
        state_dict["state"]=data.state
        state_dict["sightings"]=data.sightings
        state_list.append(state_dict)

    return jsonify(state_list)

@app.route("/api/v1.0/sightingsbymonth/")
def sightings_month():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    month_data = session.query(Month.id,Month.date,Month.sightings).all()

    session.close()

    month_list=[]
    for data in month_data:
        month_dict={}
        month_dict["Date/Time"]=data.date.strftime("%B")
        month_dict["sightings"]=data.sightings
        month_list.append(month_dict)

    return jsonify(month_list)

@app.route("/api/v1.0/sightingsbyhour/")
def sightings_hour():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    hour_data = session.query(Hour.id,Hour.hour,Hour.sightings).all()

    session.close()

    hour_list=[]
    for data in hour_data:
        hour_dict={}
        hour_dict["hour"]=data.hour
        hour_dict["sightings"]=data.sightings
        hour_list.append(hour_dict)

    return jsonify(hour_list)


# app.run statement
if __name__ == '__main__':
    app.run(debug=True)
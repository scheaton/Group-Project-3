import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,func
from flask import Flask,jsonify
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
def Welcome():
    return(
        f"<b>Welcome</b>"
    )

# app.run statement
if __name__ == '__main__':
    app.run(debug=True)
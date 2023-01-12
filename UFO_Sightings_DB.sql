DROP TABLE if exists sighting;

CREATE TABLE sighting (
Date TIMESTAMP,
City TEXT,
State TEXT,
Country TEXT,
Shape TEXT,
Duration varchar,
Summary varchar,
Posted date,
Images varchar,
ReportNum int Primary key,
Location varchar,
Latitude float,
Longitude float);

select * from sighting;

DROP TABLE if exists states;

CREATE TABLE states (
id int Primary key,
State TEXT,
Sightings int);

select * from states;

DROP TABLE if exists months;

CREATE TABLE months (
id int Primary key,
Date Timestamp,
Sightings int);

select * from months;

DROP TABLE if exists hours;

CREATE TABLE hours (
id int Primary key,
Hour int,
Sightings int);

select * from hours;

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
Latitude decimal,
Longitude decimal);

select * from sighting;
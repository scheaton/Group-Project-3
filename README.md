## Project-3

## UFO Sightings Reported in USA

**Team Members:** AJ Domingo, Samuel Heaton, Alice Johnson, Jananee Arjunan, Mia Gallucci


**PROJECT SCOPE**

 UFO sightings have been reported in all 50 U.S. states during the last century, and the sightings have varied greatly in terms of overall characteristics such as the  UFO shape and size. 


  We explored data from the National UFO Reporting Center (NUFORC) on UFO sightings within the U.S. during July - December 2022. During 2022, there were 4.6K total UFO sightings and 2.1K occurred in recent months (July - December 2022). 
We discovered patterns in the sightings reported to the NUFORC and showcased data through visualizations such as a Leaflet heatmap and Plotly charts.

**DATA SOURCES**

 * Nuforc.org: Reportings by Sighting Date, Jul - Dec ‘22, ~2.1K records([https://nuforc.org/webreports/ndxevent.html])

 * Google Maps API - Lat/Lng Coordinates

**DATA EXTRACTION**

  We scraped 2K UFO sighting records from NUFORC’s data bank between the months of July 2022 - December 2022 ([https://nuforc.org/webreports/ndxevent.html]). To scrape  the sightings data, we created a Beautiful Soup object and extracted the data we were interested in. We utilized a for loop to create a list of rows and append the record data. We repeated this process for each month of data within the target, assembling dataframes and .csv supplied with the following information specific to the sighting: sighting date, city, state, country, shape, duration, summary, date posted and whether an image was supplied. 
We found that our web scrape from NUFORC was missing one critical element to support our data visualizations: latitude and longitude coordinates. In order to obtain these data points, we utilized the Google Maps API. Using the concatenated city/state, we created a for loop to access the data we needed. After cleaning and merging the dataframes, we created a finalized dataset in .csv format.

**DATA TRANSFORMATION**

  We transformed our NUFORC + Google Maps API data to fit the needs for our visualizations. In jupyter notebook, we have merged the scraped and API data and dropped  null values to get the final data for our plots. Used the groupby function to organize the data to reflect UFO sightings by hour of day (UTC), sightings by state, and sightings by month of year during the reporting period. We exported this data to .csv format and prepared for the connection to the database.

**DATA LOADING**

  Using PostgreSQL created a  database “ufo_sightings”. This included the “sighting” table which contains all the UFO sightings, the “states” sightings table, the “months” sightings table and the “hours” sightings table. 

**BACK END**
  * Connect to DB
  * The data needed for the Visualizations are served by the Flask routes which are craeted using Flask API
  * Flask freeze formatting
  * Organize file structure (static, templates, etc.)
 
**FRONT END**

 * New JS library / plugins
 * User-driven interactions
 * Multiple pages

**VISUALIZATIONS & DATA FINDINGS**

  We created several visualizations to represent our findings. This included a Leaflet heatmap of all UFO sightings in the U.S. during the reported time period. The heatmap includes two base layers (Street Map and Topographic Map) as well as two overlays (UFO Sightings Heatmap and UFO Sightings Info). Markers have been assigned to UFO sightings for our sightings overlay according to the coordinates within our dataset. When selecting the marker, the details specific to the UFO sighting will populate, including the city, state, date reported, and description of the sighting. The heatmap overlay indicates locations with a high frequency of UFO sightings including major cities such as: New York City, Washington DC, Tampa, Detroit, Chicago, Los Angeles, San Francisco and Seattle. 
  
  The UFO sightings by shape visualization breaks down all sightings within the U.S. by UFO shape by percentage, as well as percentages of UFO shapes for each state (utilizing the dropdown functionality). Amongst all U.S. sightings, UFOs falling in the shape category “other” made up 27.4% of the total, followed by the non-distinct shape categorized as “light” at 19.1%.

  Additional visualizations to support UFO sightings data included UFO sightings by state, month, and hour of day (UTC). Using our transformed datasets, our visualizations provided us with the following insights: CA saw the highest total UFO sightings by state at 203 during the reported time period (July - December 2022), followed by Florida at 152 total sightings. Across all U.S. sightings, September saw the highest total of sightings at 455(22% of the total), and sightings declined MoM thereafter through the end of the year. Amongst all sightings, most sightings occurred between the hours of 19:00 - 23:00 (UTC). We left the hours in UTC to account for the differing time zones throughout the U.S. This insight indicates to us that most sightings occurred during the late evening and nighttime. 


* Leaflet map- UFO Sightings in the U.S 
   * Marker layer with sighting summaries and date
   
    ![Sightings_markers](https://user-images.githubusercontent.com/112193116/212520762-ad57e656-0c18-4732-807f-7547b763691b.png)

   * Heatmap layer showing density of sightings 
   
     ![SIghtings_HeatMap](https://user-images.githubusercontent.com/112193116/212520885-0a01d5ad-6096-4629-97b5-b1804186a9ae.png)
     
* Pie Chart - UFO Sightings by Shape 

    ![Sightings_By_Shape](https://user-images.githubusercontent.com/112193116/212520760-e9aad8f2-2075-4b90-aa42-4d9b512e2c24.png)
  
* Bar Chart - UFO Sightings by State 

* Bar Chart - UFO Sightings by Month 

* Bar Chart - UFO Sightings by Hour of Day (UTC)  

 
   ![SIghts_Charts](https://user-images.githubusercontent.com/112193116/212520888-7a089e9c-dffd-429b-9f7e-9bcdc15cf701.png)
 




